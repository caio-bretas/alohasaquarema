import { z } from "zod"

export const createEventSchema = z.object({
  title: z.string().min(3),

  category: z.enum([
    "PAGODE",
    "SAMBA",
    "FORRO",
    "ELETRONICO",
    "ROCK",
    "AXE",
    "SERTANEJO",
    "FESTA",
    "TEATRO",
    "ESPORTE",
    "OUTRO",
  ]),

  description: z.string().min(10),

  venueName: z.string().min(3),

  address: z.string().min(5),

  city: z.string(),

  state: z.string(),

  startDate: z.string(),

  endDate: z.string(),

  capacity: z.number().min(1),

  ageRating: z.number().min(0),

  isPrivate: z.boolean().default(false),
})

export type CreateEventInput = z.infer<typeof createEventSchema>