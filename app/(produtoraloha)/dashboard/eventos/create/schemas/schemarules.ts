import * as z from "zod";

export const step3Schema = z.object({
  // Cronograma do Evento
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de término é obrigatória"),
  doorsOpenAt: z.string().optional(),
  
  // Período de Vendas
  salesStartAt: z.string().min(1, "Início das vendas é obrigatório"),
  salesEndAt: z.string().min(1, "Fim das vendas é obrigatório"),

  // Configurações e Regras
  capacity: z.preprocess((v) => Number(v), z.number().min(1, "Capacidade mínima de 1 pessoa")),
  maxPerOrder: z.preprocess((v) => Number(v), z.number().default(10)),
  requiresCpf: z.boolean().default(true),
  allowTransfer: z.boolean().default(true),
  absorveFee: z.boolean().default(false), // Se o produtor paga a taxa da plataforma
});

export type Step3Values = z.infer<typeof step3Schema>;