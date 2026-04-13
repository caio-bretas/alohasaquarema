"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EventFormData } from "../../../schema";
import { revalidatePath } from "next/cache";

export async function CreateEventoActions(data: EventFormData) {
  // 🔐 Verifica sessão
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Você precisa estar logado.");
  }

  // 🔥 Busca o Producer pelo userId
  const producer = await prisma.producer.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!producer) {
    throw new Error("Você precisa ser um produtor para criar eventos.");
  }

  // 🔗 Gerar slug
  const slugBase = data.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const slug = `${slugBase}-${Math.random().toString(36).substring(2, 7)}`;

  try {
    const newEvent = await prisma.event.create({
      data: {
        // ✅ RELAÇÃO CORRETA
        producerId: producer.id,

        // 📌 Dados básicos
        title: data.title,
        slug,
        category: data.category as any,
        venueName: data.venueName,
        address: data.address,
        city: data.city,
        state: data.state,

        // 📅 Datas
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),

        // ⚙️ Configurações
        capacity: Number(data.capacity),
        ageRating: Number(data.ageRating),
        isPrivate: data.isPrivate,
        requiresCpf: data.requiresCpf,
        allowTransfer: data.allowTransfer,
        absorveFee: data.absorveFee,
        status: "DRAFT",

        // 🎟 Ticket Types + Lotes (Nested Create)
        ticketTypes: {
          create: data.ticketTypes.map((ticket, index) => ({
            name: ticket.name,
            isVip: ticket.isVip,
            color: ticket.color,
            position: index,

            amenities: ticket.amenities
              ? ticket.amenities.split(",").map((a) => a.trim())
              : [],

            batches: {
              create: ticket.batches.map((batch, batchIndex) => ({
                name: batch.name || "Lote Único",
                price: Number(batch.price),
                totalQuantity: Number(batch.quantity),
                maxPerOrder: Number(batch.maxPerOrder || 10),
                position: batchIndex,
                status: "ACTIVE",

                // ❌ NÃO colocar eventId
                // ❌ NÃO usar connect
              })),
            },
          })),
        },
      },
    });

    console.log("✅ Evento criado:", newEvent.id);

    // 🔄 Revalidar página
    revalidatePath("/dashboard/eventos");

    return {
      success: true,
      id: newEvent.id,
    };
  } catch (error) {
    console.error("❌ Erro ao criar evento:", error);

    return {
      success: false,
      error: "Erro ao criar evento no banco",
    };
  }
}