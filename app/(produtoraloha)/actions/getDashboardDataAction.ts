"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getDashboardDataAction() {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Não autorizado")
  }

  const user =
    await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },

      include: {
        producer: true,
      },
    })

  if (
    !user ||
    (
      user.role !== "ADMIN" &&
      user.role !== "PRODUCER"
    )
  ) {
    throw new Error("Sem permissão")
  }

  const producerId =
    user.producer?.id

  const events =
    await prisma.event.findMany({

      where:
        user.role === "ADMIN"
          ? {}
          : {
              producerId,
            },

      include: {
        orders: {
          include: {
            items: true,
          },
        },

        ticketTypes: {
          include: {
            batches: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    })

  const totalEvents =
    events.length

  // TOTAL DE INGRESSOS VENDIDOS
  const totalOrders =
    events.reduce(
      (acc, event) =>
        acc +
        event.orders.reduce(
          (sum, order) => {

            if (
              order.status !==
              "PAID"
            ) {
              return sum
            }

            return (
              sum +
              order.items.reduce(
                (
                  itemSum,
                  item
                ) =>
                  itemSum +
                  item.quantity,
                0
              )
            )
          },
          0
        ),
      0
    )

  // RECEITA TOTAL
  const totalRevenue =
    events.reduce(
      (acc, event) =>
        acc +
        event.orders.reduce(
          (sum, order) =>
            order.status ===
            "PAID"
              ? sum +
                Number(
                  order.total
                )
              : sum,
          0
        ),
      0
    )

  const activeEvents =
    events.filter(
      (event) =>
        event.status ===
        "PUBLISHED"
    ).length

  return {

    stats: {
      totalEvents,
      totalOrders,
      totalRevenue,
      activeEvents,
    },

    events,
  }
}