import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

class PaymentError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      {
        success: false,
        error: "Não autorizado",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const body = (await req.json()) as {
      orderId?: string;
    };

    if (!body.orderId) {
      throw new PaymentError(
        "Pedido não informado",
      );
    }

    const now = new Date();

    const result =
      await prisma.$transaction(
        async (tx) => {
          const order =
            await tx.order.findUnique({
              where: {
                id: body.orderId,
              },
              include: {
                reservedSeats: true,
                items: {
                  include: {
                    batch: {
                      include: {
                        ticketType: {
                          include: {
                            event: true,
                            _count: {
                              select: {
                                seats: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            });

          if (!order) {
            throw new PaymentError(
              "Pedido não encontrado",
              404,
            );
          }

          if (
            order.userId !==
            session.user.id
          ) {
            throw new PaymentError(
              "Pedido não autorizado",
              403,
            );
          }

          if (order.status === "PAID") {
            return {
              alreadyPaid: true,
              expired: false,
            };
          }

          if (order.status !== "PENDING") {
            throw new PaymentError(
              "Este pedido não pode ser pago",
              409,
            );
          }

          if (
            order.expiresAt &&
            order.expiresAt <= now
          ) {
            const cancelled =
              await tx.order.updateMany({
                where: {
                  id: order.id,
                  status: "PENDING",
                },
                data: {
                  status: "CANCELLED",
                },
              });

            if (cancelled.count > 0) {
              await tx.seat.updateMany({
                where: {
                  reservedByOrderId:
                    order.id,
                  status: "RESERVED",
                },
                data: {
                  status: "AVAILABLE",
                  reservedByOrderId:
                    null,
                  reservedUntil: null,
                },
              });

              for (const item of order.items) {
                await tx.batch.update({
                  where: {
                    id: item.batchId,
                  },
                  data: {
                    reservedQuantity:
                      Math.max(
                        0,
                        item.batch
                          .reservedQuantity -
                          item.quantity,
                      ),
                  },
                });
              }
            }

            return {
              alreadyPaid: false,
              expired: true,
            };
          }

          const paymentClaim =
            await tx.order.updateMany({
              where: {
                id: order.id,
                userId: session.user.id,
                status: "PENDING",
              },
              data: {
                status: "PAID",
                paidAt: now,
              },
            });

          if (paymentClaim.count !== 1) {
            throw new PaymentError(
              "O pedido já foi processado",
              409,
            );
          }

          for (const item of order.items) {
            const matchingSeats =
              order.reservedSeats.filter(
                (seat) =>
                  seat.ticketTypeId ===
                  item.batch.ticketTypeId,
              );

            const requiresSeat =
              item.batch.ticketType._count
                .seats > 0;

            if (
              requiresSeat &&
              matchingSeats.length !==
                item.quantity
            ) {
              throw new PaymentError(
                "A reserva do camarote não foi encontrada",
                409,
              );
            }

            if (requiresSeat) {
              for (const seat of matchingSeats) {
                await tx.ticket.create({
                  data: {
                    orderId: order.id,
                    userId:
                      session.user.id,
                    seatId: seat.id,
                    qrCode: randomUUID(),
                    eventTitle:
                      item.batch.ticketType
                        .event.title,
                    ticketTypeName:
                      item.batch.ticketType
                        .name,
                    batchName:
                      item.batch.name,
                    pricePaid:
                      item.unitPrice,
                    holderName:
                      order.buyerName,
                    holderCpf:
                      order.buyerCpf,
                  },
                });
              }
            } else {
              for (
                let index = 0;
                index < item.quantity;
                index++
              ) {
                await tx.ticket.create({
                  data: {
                    orderId: order.id,
                    userId:
                      session.user.id,
                    qrCode: randomUUID(),
                    eventTitle:
                      item.batch.ticketType
                        .event.title,
                    ticketTypeName:
                      item.batch.ticketType
                        .name,
                    batchName:
                      item.batch.name,
                    pricePaid:
                      item.unitPrice,
                    holderName:
                      order.buyerName,
                    holderCpf:
                      order.buyerCpf,
                  },
                });
              }
            }

            const nextSoldQuantity =
              item.batch.soldQuantity +
              item.quantity;

            await tx.batch.update({
              where: {
                id: item.batchId,
              },
              data: {
                reservedQuantity:
                  Math.max(
                    0,
                    item.batch
                      .reservedQuantity -
                      item.quantity,
                  ),
                soldQuantity: {
                  increment: item.quantity,
                },
                ...(nextSoldQuantity >=
                item.batch.totalQuantity
                  ? {
                      status: "SOLD_OUT",
                    }
                  : {}),
              },
            });
          }

          await tx.seat.updateMany({
            where: {
              reservedByOrderId:
                order.id,
              status: "RESERVED",
            },
            data: {
              status: "SOLD",
              reservedByOrderId: null,
              reservedUntil: null,
            },
          });

          return {
            alreadyPaid: false,
            expired: false,
          };
        },
      );

    if (result.expired) {
      return Response.json(
        {
          success: false,
          error:
            "O tempo da reserva expirou",
        },
        {
          status: 410,
        },
      );
    }

    return Response.json({
      success: true,
      alreadyPaid: result.alreadyPaid,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof PaymentError) {
      return Response.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: error.status,
        },
      );
    }

    return Response.json(
      {
        success: false,
        error:
          "Erro ao confirmar pagamento",
      },
      {
        status: 500,
      },
    );
  }
}