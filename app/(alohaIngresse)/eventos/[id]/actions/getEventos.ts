import "server-only";

import { prisma } from "@/lib/prisma";

export async function getEventoById(id: string) {
  if (
    typeof id !== "string" ||
    id.trim().length === 0 ||
    id.length > 64
  ) {
    return {
      data: null,
      error: "Identificador do evento inválido",
    };
  }

  try {
    const evento = await prisma.event.findFirst({
      where: {
        id,
        status: "PUBLISHED",
      },

      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        coverImageUrl: true,
        startDate: true,
        ageRating: true,
        address: true,
        city: true,

        ticketTypes: {
          orderBy: {
            position: "asc",
          },

          select: {
            id: true,
            name: true,
            isVip: true,

            batches: {
              where: {
                status: "ACTIVE",
              },

              orderBy: {
                price: "asc",
              },

              select: {
                id: true,
                name: true,
                price: true,
              },
            },

            seats: {
              orderBy: [
                {
                  row: "asc",
                },
                {
                  number: "asc",
                },
              ],

              select: {
                id: true,
                ticketTypeId: true,
                row: true,
                number: true,
                label: true,
                capacity: true,
                status: true,
                reservedUntil: true,
              },
            },
          },
        },
      },
    });

    if (!evento) {
      return {
        data: null,
        error: "Evento não encontrado",
      };
    }

    return {
      data: evento,
      error: null,
    };
  } catch (error) {
    console.error("Erro interno ao buscar evento:", error);

    return {
      data: null,
      error: "Erro ao buscar evento",
    };
  }
}