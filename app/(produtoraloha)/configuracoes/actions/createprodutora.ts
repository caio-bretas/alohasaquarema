"use server";// app/(produtoraloha)/dashboard/configuracoes/actions/update-profile.ts

"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import * as z from "zod"

const updateProfileSchema =
  z.object({

    fullName:
      z.string().min(3),

    email:
      z.email(),

    companyName:
      z.string().min(2),

    document:
      z.string(),

    bio:
      z.string().optional(),
  })

export async function updateProfileAction(
  data: unknown
) {

  const session =
    await auth()

  if (!session?.user?.id) {

    return {
      error:
        "Não autorizado",
    }
  }

  const parsed =
    updateProfileSchema.safeParse(
      data
    )

  if (!parsed.success) {

    return {
      error:
        "Dados inválidos",
    }
  }

  const values =
    parsed.data

  try {

    // atualiza usuário
    await prisma.user.update({

      where: {
        id:
          session.user.id,
      },

      data: {

        name:
          values.fullName,

        email:
          values.email,

        role:
          "PRODUCER",
      },
    })

    // verifica se já existe producer
    const producer =
      await prisma.producer.findUnique({

        where: {
          userId:
            session.user.id,
        },
      })

    // se não existir cria
    if (!producer) {

      await prisma.producer.create({

        data: {

          userId:
            session.user.id,

          companyName:
            values.companyName,

          cnpj:
            values.document,

          description:
            values.bio,

          isVerified: true,
        },
      })

    } else {

      // se existir atualiza
      await prisma.producer.update({

        where: {
          id:
            producer.id,
        },

        data: {

          companyName:
            values.companyName,

          cnpj:
            values.document,

          description:
            values.bio,

          isVerified: true,
        },
      })
    }

    return {
      success: true,
    }

  } catch (error) {

    console.error(error)

    return {
      error:
        "Erro ao atualizar perfil",
    }
  }
}