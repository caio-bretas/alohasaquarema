import * as z from "zod"
export const formeditschema = z.object({
 nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }).max(50),
 email: z.string().min(1, { message: "O email é obrigatório" }).email("Endereço de email inválido").max(50),
phone: z.string().min(1, { message: "O telefone é obrigatório" }).max(50),
})

export type FormEditSchema = z.infer<typeof formeditschema>