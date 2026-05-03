"use server"

import { prisma } from "@/lib/prisma"

export async function getEventsAction() {
  try {
    const events = await prisma.event.findMany({
      where: {
        status: "PUBLISHED", // Busca apenas os publicados
      },
      include: {
        // Inclui os tipos de ingressos
        ticketTypes: {
          include: {
            // Inclui os lotes de cada tipo para pegar o preço
            batches: {
              where: {
                status: "ACTIVE",
              },
              orderBy: {
                price: "asc", // Garante que o menor preço venha primeiro
              },
            },
          },
        },
      },
      orderBy: {
        startDate: "asc", // Eventos mais próximos primeiro
      },
    })

    return { events }
  } catch (error) {
    console.error("ERRO_AO_BUSCAR_EVENTOS:", error)
    return { events: [], error: "Falha ao carregar eventos." }
  }
}