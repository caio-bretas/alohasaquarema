"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function CreateEventDraft(data: any) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  const producer = await prisma.producer.findUnique({
    where: { userId: session.user.id },
  });

  if (!producer) {
    throw new Error("Produtor não encontrado");
  }

  const slug = data.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const event = await prisma.event.create({
    data: {
      producerId: producer.id,
      
      title: data.title,
      slug: `${slug}-${Math.random().toString(36).substring(2, 7)}`,
      category: data.category,
      capacity: Number(data.capacity),
      ageRating: Number(data.ageRating),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      venueName: data.venueName || "",
      address: data.address || "",

      status: "DRAFT",
    },
  });

  return event.id;
}




export async function UpdateEventLocation(eventId: string, data: any) {
  await prisma.event.update({
    where: { id: eventId },
    data: {
      venueName: data.venueName,
      address: data.address,
      city: data.city,
      state: data.state,
    },
  });
}