"use server"

import { prisma } from "@/lib/prisma"

export async function getUserTicketsAction(userId: string) {
  try {

    const tickets = await prisma.ticket.findMany({
      where: {
        userId,
      },

      include: {
        order: {
          include: {
            event: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    })

    return {
      tickets: tickets.map((ticket) => ({

        id: ticket.id,

        title: ticket.order.event.title,

        location: `${ticket.order.event.venueName} - ${ticket.order.event.city}`,

        date: new Date(
          ticket.order.event.startDate
        ).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

        hour: new Date(
          ticket.order.event.startDate
        ).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),

        image:
          ticket.order.event.bannerImageUrl ||
          "/benner.png",

        qrCode: ticket.qrCode,

        status:
          ticket.status === "ACTIVE"
            ? "Confirmado"
            : ticket.status,

        sector: ticket.ticketTypeName,
      })),
    }

  } catch (error) {

    console.error(
      "ERRO_AO_BUSCAR_INGRESSOS",
      error
    )

    return {
      tickets: [],
    }
  }
}