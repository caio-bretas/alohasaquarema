import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

type CheckoutItemInput = {
  batchId: string;
  quantity: number;
  seatIds: string[];
};

class CheckoutError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

function parseItems(value: unknown): CheckoutItemInput[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new CheckoutError(
      "Nenhum ingresso selecionado",
    );
  }

  return value.map((valueItem) => {
    if (
      typeof valueItem !== "object" ||
      valueItem === null
    ) {
      throw new CheckoutError(
        "Item inválido",
      );
    }

    const item = valueItem as Record<
      string,
      unknown
    >;

    if (
      typeof item.batchId !== "string" ||
      !Number.isInteger(item.quantity) ||
      Number(item.quantity) <= 0
    ) {
      throw new CheckoutError(
        "Dados do ingresso inválidos",
      );
    }

    const seatIds =
      item.seatIds === undefined
        ? []
        : item.seatIds;

    if (
      !Array.isArray(seatIds) ||
      !seatIds.every(
        (seatId) =>
          typeof seatId === "string",
      )
    ) {
      throw new CheckoutError(
        "Camarote inválido",
      );
    }

    return {
      batchId: item.batchId,
      quantity: Number(item.quantity),
      seatIds,
    };
  });
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
    const body = (await req.json()) as Record<
      string,
      unknown
    >;

    if (typeof body.eventId !== "string") {
      throw new CheckoutError(
        "Evento inválido",
      );
    }

    const eventId = body.eventId;
    const items = parseItems(body.items);

    const seatIds = items.flatMap(
      (item) => item.seatIds,
    );

    if (
      new Set(seatIds).size !==
      seatIds.length
    ) {
      throw new CheckoutError(
        "O mesmo camarote foi selecionado mais de uma vez",
      );
    }

    const now = new Date();

    const expiresAt = new Date(
      now.getTime() + 10 * 60 * 1000,
    );

    const pixCode = `PIX-${randomUUID()}`;

    const order = await prisma.$transaction(
      async (tx) => {
        // Libera pedidos expirados do evento.
        const expiredOrders =
          await tx.order.findMany({
            where: {
              eventId,
              status: "PENDING",
              expiresAt: {
                lte: now,
              },
            },
            include: {
              items: true,
            },
            take: 100,
          });

        for (const expiredOrder of expiredOrders) {
          const cancelled =
            await tx.order.updateMany({
              where: {
                id: expiredOrder.id,
                status: "PENDING",
              },
              data: {
                status: "CANCELLED",
              },
            });

          if (cancelled.count === 0) {
            continue;
          }

          await tx.seat.updateMany({
            where: {
              reservedByOrderId:
                expiredOrder.id,
              status: "RESERVED",
            },
            data: {
              status: "AVAILABLE",
              reservedByOrderId: null,
              reservedUntil: null,
            },
          });

          for (const expiredItem of expiredOrder.items) {
            const batch =
              await tx.batch.findUnique({
                where: {
                  id: expiredItem.batchId,
                },
                select: {
                  reservedQuantity: true,
                },
              });

            if (!batch) continue;

            await tx.batch.update({
              where: {
                id: expiredItem.batchId,
              },
              data: {
                reservedQuantity: Math.max(
                  0,
                  batch.reservedQuantity -
                    expiredItem.quantity,
                ),
              },
            });
          }
        }

        let subtotal = 0;

        const preparedItems: Array<{
          batchId: string;
          quantity: number;
          unitPrice: number;
          totalPrice: number;
          ticketTypeId: string;
          seatIds: string[];
        }> = [];

        for (const item of items) {
          const batch =
            await tx.batch.findUnique({
              where: {
                id: item.batchId,
              },
              include: {
                ticketType: {
                  select: {
                    eventId: true,
                    _count: {
                      select: {
                        seats: true,
                      },
                    },
                  },
                },
              },
            });

          if (!batch) {
            throw new CheckoutError(
              "Lote não encontrado",
              404,
            );
          }

          if (
            batch.ticketType.eventId !==
            eventId
          ) {
            throw new CheckoutError(
              "O lote não pertence a este evento",
            );
          }

          if (batch.status !== "ACTIVE") {
            throw new CheckoutError(
              "Este lote não está disponível",
              409,
            );
          }

          if (
            batch.startSaleAt &&
            batch.startSaleAt > now
          ) {
            throw new CheckoutError(
              "As vendas ainda não começaram",
              409,
            );
          }

          if (
            batch.endSaleAt &&
            batch.endSaleAt < now
          ) {
            throw new CheckoutError(
              "As vendas deste lote terminaram",
              409,
            );
          }

          if (
            item.quantity <
              batch.minPerOrder ||
            item.quantity >
              batch.maxPerOrder
          ) {
            throw new CheckoutError(
              `Quantidade permitida: ${batch.minPerOrder} até ${batch.maxPerOrder}`,
            );
          }

          const remaining =
            batch.totalQuantity -
            batch.soldQuantity -
            batch.reservedQuantity;

          if (item.quantity > remaining) {
            throw new CheckoutError(
              "Quantidade indisponível",
              409,
            );
          }

          const requiresSeat =
            batch.ticketType._count.seats >
            0;

          if (
            requiresSeat &&
            item.seatIds.length !==
              item.quantity
          ) {
            throw new CheckoutError(
              "Selecione o camarote no mapa",
            );
          }

          if (
            !requiresSeat &&
            item.seatIds.length > 0
          ) {
            throw new CheckoutError(
              "Este ingresso não utiliza camarote",
            );
          }

          if (item.seatIds.length > 0) {
            const seats =
              await tx.seat.findMany({
                where: {
                  id: {
                    in: item.seatIds,
                  },
                },
                select: {
                  id: true,
                  status: true,
                  ticketTypeId: true,
                },
              });

            if (
              seats.length !==
              item.seatIds.length
            ) {
              throw new CheckoutError(
                "Camarote não encontrado",
                404,
              );
            }

            const unavailable =
              seats.some(
                (seat) =>
                  seat.status !==
                    "AVAILABLE" ||
                  seat.ticketTypeId !==
                    batch.ticketTypeId,
              );

            if (unavailable) {
              throw new CheckoutError(
                "Este camarote acabou de ser reservado por outra pessoa",
                409,
              );
            }
          }

          const unitPrice = Number(
            batch.price,
          );

          const totalPrice =
            unitPrice * item.quantity;

          subtotal += totalPrice;

          preparedItems.push({
            batchId: batch.id,
            quantity: item.quantity,
            unitPrice,
            totalPrice,
            ticketTypeId:
              batch.ticketTypeId,
            seatIds: item.seatIds,
          });
        }

        const createdOrder =
          await tx.order.create({
            data: {
              userId: session.user.id,
              eventId,
              status: "PENDING",
              subtotal,
              total: subtotal,
              buyerName:
                session.user.name ||
                "Cliente",
              buyerEmail:
                session.user.email || "",
              paymentMethod: "PIX",
              paymentData: {
                pixCode,
              },
              expiresAt,
              items: {
                create: preparedItems.map(
                  (item) => ({
                    batchId: item.batchId,
                    quantity: item.quantity,
                    unitPrice:
                      item.unitPrice,
                    totalPrice:
                      item.totalPrice,
                  }),
                ),
              },
            },
          });

        for (const item of preparedItems) {
          if (item.seatIds.length > 0) {
            const reservation =
              await tx.seat.updateMany({
                where: {
                  id: {
                    in: item.seatIds,
                  },
                  ticketTypeId:
                    item.ticketTypeId,
                  status: "AVAILABLE",
                },
                data: {
                  status: "RESERVED",
                  reservedByOrderId:
                    createdOrder.id,
                  reservedUntil:
                    expiresAt,
                },
              });

            if (
              reservation.count !==
              item.seatIds.length
            ) {
              throw new CheckoutError(
                "Este camarote acabou de ser reservado",
                409,
              );
            }
          }

          await tx.batch.update({
            where: {
              id: item.batchId,
            },
            data: {
              reservedQuantity: {
                increment: item.quantity,
              },
            },
          });
        }

        return createdOrder;
      },
      {
        isolationLevel: "Serializable",
      },
    );

    return Response.json({
      success: true,
      orderId: order.id,
      pixCode: {
        pixCode,
      },
      expiresAt,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof CheckoutError) {
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
        error: "Erro interno no servidor",
      },
      {
        status: 500,
      },
    );
  }
}