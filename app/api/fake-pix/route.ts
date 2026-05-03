// app/api/fake-pix/route.ts

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"

export async function POST(
  req: Request
) {

  const session =
    await auth()

  if (!session) {

    return Response.json(
      {
        error:
          "Não autorizado",
      },
      {
        status: 401,
      }
    )
  }

  try {

    const body =
      await req.json()

    const {
      userId,
      eventId,
      items,
    } = body

    /*
      items:
      [
        {
          batchId: "...",
          quantity: 2
        }
      ]
    */

    let subtotal = 0

    const orderItems = []

    for (const item of items) {

      const batch =
        await prisma.batch.findUnique({
          where: {
            id: item.batchId,
          },
        })

      if (!batch) {
        continue
      }

      const totalPrice =
        Number(batch.price) *
        item.quantity

      subtotal += totalPrice

      orderItems.push({
        batchId: batch.id,

        quantity:
          item.quantity,

        unitPrice:
          Number(
            batch.price
          ),

        totalPrice,
      })
    }

    const order =
      await prisma.order.create({

        data: {

          userId,

          eventId,

          status:
            "PENDING",

          subtotal,

          total: subtotal,

          buyerName:
            session.user.name ||
            "Cliente",

          buyerEmail:
            session.user.email ||
            "",

          paymentMethod:
            "PIX",

          paymentData: {
            pixCode:
              `PIX-${randomUUID()}`,
          },

          items: {
            create:
              orderItems,
          },
        },

        include: {
          items: true,
        },
      })

    // cria ingressos
    for (const item of order.items) {

      const batch =
        await prisma.batch.findUnique({

          where: {
            id: item.batchId,
          },

          include: {

            ticketType: {

              include: {
                event: true,
              },
            },
          },
        })

      if (!batch) {
        continue
      }

      for (
        let i = 0;
        i < item.quantity;
        i++
      ) {

        await prisma.ticket.create({

          data: {

            orderId:
              order.id,

            userId,

            qrCode:
              randomUUID(),

            eventTitle:
              batch.ticketType
                .event.title,

            ticketTypeName:
              batch.ticketType
                .name,

            batchName:
              batch.name,

            pricePaid:
              item.unitPrice,

            holderName:
              session.user.name ||
              "Cliente",
          },
        })
      }
    }

    // simula pagamento aprovado
    setTimeout(
      async () => {

        await prisma.order.update({
          where: {
            id: order.id,
          },

          data: {
            status: "PAID",

            paidAt:
              new Date(),
          },
        })
      },

      5000
    )

    return Response.json({

      success: true,

      orderId:
        order.id,

      pixCode:
        order.paymentData,

      expiresIn:
        "10:00",
    })

  } catch (error) {

    console.error(error)

    return Response.json(
      {
        success: false,

        error:
          "Erro interno no servidor",
      },
      {
        status: 500,
      }
    )
  }
}