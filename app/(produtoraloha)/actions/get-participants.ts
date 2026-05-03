// app/(produtoraloha)/dashboard/participantes/actions/get-participants.ts
"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getParticipants(eventId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Não autorizado")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      producer: true,
    },
  })

  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  if (
    user.role !== "ADMIN" &&
    user.role !== "PRODUCER"
  ) {
    throw new Error("Sem permissão")
  }

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,

      ...(user.role !== "ADMIN"
        ? {
            producerId: user.producer?.id,
          }
        : {}),
    },
  })

  if (!event) {
    throw new Error("Evento não encontrado")
  }

  const participants = await prisma.ticket.findMany({
    where: {
      order: {
        eventId,
      },
    },

    include: {
      user: true,

      order: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  })

  return participants.map((ticket) => ({
    id: ticket.id,

    name:
      ticket.holderName ||
      ticket.user.name ||
      "Sem nome",

    email:
      ticket.user.email ||
      ticket.order.buyerEmail,

    ticket:
      ticket.ticketTypeName,

    batch:
      ticket.batchName,

    status:
      ticket.order.status === "PAID"
        ? "pago"
        : "pendente",

    checkin:
      !!ticket,

    createdAt:
      ticket.createdAt,
  }))
}