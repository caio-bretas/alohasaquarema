import { z } from "zod";

export const eventSchema = z.object({
  // Step 1: Evento
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  description: z.string().optional(),
  tags: z.string().optional(),
  ageRating: z.string(),
  capacity: z.coerce.number().min(1, "Capacidade deve ser maior que 0"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de término é obrigatória"),
  doorsOpenAt: z.string().optional(),
  salesEndAt: z.string().optional(),
  requiresCpf: z.boolean().default(true),
  allowTransfer: z.boolean().default(true),
  absorveFee: z.boolean().default(false),
  isPrivate: z.boolean().default(false),

  // Step 2: Local
  venueName: z.string().min(3, "Nome do local é obrigatório"),
  address: z.string().min(5, "Endereço obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().length(2, "UF inválida"),
  zipCode: z.string().optional(),

  // Step 3: Ingressos (Array de objetos)
  ticketTypes: z.array(z.object({
    id: z.string(),
    name: z.string().min(2, "Nome do ingresso obrigatório"),
    isVip: z.boolean(),
    color: z.string(),
    amenities: z.string().optional(),
    batches: z.array(z.object({
      id: z.string(),
      name: z.string().min(1, "Nome do lote obrigatório"),
      price: z.coerce.number().min(0),
      quantity: z.coerce.number().min(1, "Qtd mínima 1"),
      maxPerOrder: z.coerce.number().min(1),
      startSaleAt: z.string().optional(),
      endSaleAt: z.string().optional(),
    })).min(1, "Adicione pelo menos um lote")
  })).min(1, "Crie pelo menos um tipo de ingresso"),

  // Step 4: Cupons
  coupons: z.array(z.object({
    id: z.string(),
    code: z.string().min(3),
    type: z.enum(["PERCENTAGE", "FIXED"]),
    value: z.coerce.number().min(1),
    totalLimit: z.coerce.number().optional(),
    expiresAt: z.string().optional(),
  })).optional(),
});

export type EventFormData = z.infer<typeof eventSchema>;