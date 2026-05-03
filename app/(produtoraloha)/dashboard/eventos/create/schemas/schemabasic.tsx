import * as z from "zod";

// Categorias vindas do seu Enum no Prisma
export const EventCategory = [
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
] as const;

export const step1Schema = z.object({
  title: z.string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(60, "Título muito longo para o SEO"),
  slug: z.string()
    .min(3, "O slug é gerado automaticamente pelo título"),
  description: z.string()
    .min(20, "A descrição precisa de pelo menos 20 caracteres para um bom SEO")
    .max(2000, "Limite de 2000 caracteres"),
 category: z.enum(EventCategory, {
    message: "Selecione uma categoria válida",
  }),

  ageRating: z.string().transform((v) => Number(v)), // Converte para Int para o Prisma
  isPrivate: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type Step1Values = z.infer<typeof step1Schema>;