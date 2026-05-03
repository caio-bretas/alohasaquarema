"use server"

import { prisma } from "@/lib/prisma"

export async function getEventsAction() {
  try {
    const events = await prisma.event.findMany({
      
      // ❌ REMOVIDO: status fixo que escondia eventos
      // agora traz TODOS os eventos
      
      include: {
        ticketTypes: {
          include: {
            batches: {
              where: {
                status: "ACTIVE",
              },
              orderBy: {
                price: "asc",
              },
            },
          },
        },

        // opcional mas útil para dashboard futuro
        producer: true,
      },

      orderBy: {
        startDate: "desc",
      },
    })

    return { events }

  } catch (error) {
    console.error("ERRO_AO_BUSCAR_EVENTOS:", error)

    return {
      events: [],
      error: "Falha ao carregar eventos.",
    }
  }
}