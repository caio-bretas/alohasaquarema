// app/(produtoraloha)/dashboard/configuracoes/actions/get-profile.ts

"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getProfileAction() {

  const session =
    await auth()

  if (!session?.user?.id) {

    return {
      error:
        "Não autorizado",
    }
  }

  try {

    const user =
      await prisma.user.findUnique({

        where: {
          id:
            session.user.id,
        },

        include: {
          producer: true,
        },
      })

    if (!user) {

      return {
        error:
          "Usuário não encontrado",
      }
    }

    return {

      id:
        user.id,

      fullName:
        user.name || "",

      email:
        user.email || "",

      phone:
        user.phone || "",

      role:
        user.role,

      producer: user.producer
        ? {

            id:
              user.producer.id,

            companyName:
              user.producer.companyName || "",

            cnpj:
              user.producer.cnpj || "",

            description:
              user.producer.description || "",

            logoUrl:
              user.producer.logoUrl || "",

            bannerUrl:
              user.producer.bannerUrl || "",

            instagram:
              user.producer.instagram || "",

            website:
              user.producer.website || "",

            isVerified:
              user.producer.isVerified,
          }
        : null,
    }

  } catch (error) {

    console.error(error)

    return {
      error:
        "Erro ao buscar perfil",
    }
  }
}