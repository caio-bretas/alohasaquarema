import * as z from "zod";

export const step2Schema = z.object({
  // Localização
  venueName: z.string().min(2, "O nome do local é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido"),
  address: z.string().min(5, "Endereço completo é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Use a sigla do estado (Ex: RJ)"),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),

  // Mídia (URLs que virão do seu upload, ex: S3 ou Uploadthing)
  coverImageUrl: z.string().url("URL da capa inválida").nullable(),
  bannerImageUrl: z.string().url("URL do banner inválida").nullable(),
  galleryUrls: z.array(z.string().url()).default([]),
});

export type Step2Values = z.infer<typeof step2Schema>;