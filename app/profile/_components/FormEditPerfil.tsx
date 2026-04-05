"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formeditschema, FormEditSchema } from "../schema/formeditschema";
import { Button } from "@/components/ui/button";
import { UpadeteActionsInfo } from "../actions/UpadeteActionsInfo";
import { toast } from "sonner";
interface UserData{
    nome?: string,
    email?: string
    telefone?: string
}
export function FormEditPerfil({email,nome,telefone}:  UserData){
     const form = useForm<FormEditSchema>({
    resolver: zodResolver(formeditschema),
    defaultValues: {
      nome: nome || "",
      email: email || "",
      telefone: telefone || "",
      
    },
  })

  async function handleupadateinfo(data: FormEditSchema) {
  const res= await UpadeteActionsInfo(data)
  if(res?.error){
     toast.error("Erro ao atualizar informações")
  }

  return toast.success("Informações atualizadas com sucesso")

   
  }

    return(
        <form onSubmit={form.handleSubmit(handleupadateinfo)}>
            <FieldGroup>
                 <Controller
              name="nome"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Seu Nome
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: João da Silva"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

             <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Seu Email
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: example@gmail.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
                  <Controller
              name="telefone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Seu telefone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: (00) 00000-0000"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            </FieldGroup>
            <Button className="mt-4 w-full" >Salvar</Button>
        </form>
    )
}