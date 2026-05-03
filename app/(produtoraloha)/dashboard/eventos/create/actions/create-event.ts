"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createEventAction(
  data: any
) {

  const session =
    await auth()

  if (!session?.user?.id) {

    return {
      error:
        "Você precisa estar logado.",
    }
  }

  // busca usuário
 const user =
  await prisma.user.findUnique({

    where: {
      id: session.user.id,
    },

    include: {
      producer: true,
    },
  })

if (!user) {

  return {
    error: "Usuário não encontrado",
  }
}

if (
  user.role !== "ADMIN" &&
  user.role !== "PRODUCER"
) {

  return {
    error: "Sem permissão",
  }
}

let producerId =
  user.producer?.id

// cria producer automático
if (!producerId) {

  const producer =
    await prisma.producer.create({

      data: {

        userId: user.id,

        companyName:
          user.name ||
          "Produtora",
      },
    })

  producerId =
    producer.id
}

    console.log("user:", user)
  // só ADMIN ou PRODUCER
  if (
    !user ||
    (
      user.role !== "ADMIN" &&
      user.role !== "PRODUCER"
    )
  ) {

    return {
      error:
        "Sem permissão para criar eventos.",
    }
  }

  // producer obrigatório
  if (!user.producer) {

    return {
      error:
        "Perfil de produtor não encontrado.",
    }
  }

  console.log("produtor:", user.producer.id)

  try {

    const categoryFormatted =
      data.category
        ? data.category
            .toUpperCase()
        : "OUTRO"

    await prisma.event.create({

      data: {

        // evento vinculado
        // ao producer dono
        producerId:
          user.producer.id,

        title:
          data.title,

        slug:
          data.slug,

        description:
          data.description || "",

        category:
          categoryFormatted as any,

        status:
          "DRAFT",

        venueName:
          data.venueName,

        address:
          data.address,

        city:
          data.city ||
          "Saquarema",

        state:
          data.state || "RJ",

        zipCode:
          data.zipCode || "",

        startDate:
          new Date(
            data.startDate
          ),

        endDate:
          new Date(
            data.endDate
          ),

        salesStartAt:
          data.salesStartAt
            ? new Date(
                data.salesStartAt
              )
            : null,

        salesEndAt:
          data.salesEndAt
            ? new Date(
                data.salesEndAt
              )
            : null,

        coverImageUrl:
          data.coverImageUrl ||
          null,

        bannerImageUrl:
          data.bannerImageUrl ||
          null,

        galleryUrls:
          data.galleryUrls || [],

        ageRating:
          Number(
            data.ageRating
          ) || 18,

        capacity:
          Number(
            data.capacity
          ) || 0,

        isPrivate:
          Boolean(
            data.isPrivate
          ),

        requiresCpf:
          Boolean(
            data.requiresCpf
          ),

        allowTransfer:
          Boolean(
            data.allowTransfer
          ),

        maxPerOrder:
          Number(
            data.maxPerOrder
          ) || 10,

        absorveFee:
          Boolean(
            data.absorveFee
          ),

        tags:
          data.tags || [],

        ticketTypes: {

          create:
            data.ticketTypes.map(
              (
                ticket: any
              ) => ({

                name:
                  ticket.name,

                description:
                  ticket.description,

                isVip:
                  ticket.isVip,

                batches: {

                  create:
                    ticket.batches.map(
                      (
                        batch: any
                      ) => ({

                        name:
                          batch.name,

                        price:
                          Number(
                            batch.price
                          ),

                        totalQuantity:
                          Number(
                            batch.totalQuantity
                          ),

                        status:
                          "ACTIVE",

                        startSaleAt:
                          data.salesStartAt
                            ? new Date(
                                data.salesStartAt
                              )
                            : new Date(),
                      })
                    ),
                },
              })
            ),
        },
      },
    })

    revalidatePath(
      "/dashboard/eventos"
    )

  } catch (error: any) {

    console.error(
      "❌ ERRO:",
      error
    )

    if (
      error.code === "P2002"
    ) {

      return {
        error:
          "Slug já utilizado.",
      }
    }

    return {
      error:
        error.message ||
        "Erro ao criar evento.",
    }
  }

  redirect(
    "/dashboard/eventos"
  )
}