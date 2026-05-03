"use client"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"

import {
  Save,
  Camera,
} from "lucide-react"
import { updateProfileAction } from "../actions/createprodutora"

const profileSchema =
  z.object({

    fullName:
      z.string()
        .min(
          3,
          "Nome obrigatório"
        ),

    email:
      z.email(
        "Email inválido"
      ),

    companyName:
      z.string()
        .min(
          2,
          "Empresa obrigatória"
        ),

    document:
      z.string()
        .min(
          11,
          "Documento inválido"
        ),

    bio:
      z.string()
        .optional(),
  })

type ProfileFormData =
  z.infer<
    typeof profileSchema
  >

export function ProfileSettings({session, Producer }: {session: any, Producer: any}) {

  
  const producerData = {
    companyName: Producer?.producer.companyName || "",
    document: Producer?.producer.cnpj || "",
    bio: Producer?.producer.description || "",
  }
console.log("producerData:", producerData)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<
    ProfileFormData
  >({

    resolver:
      zodResolver(
        profileSchema
      ),

    defaultValues: {

      fullName:
       session?.user?.name || "",

      email:
        session?.user?.email || "",

      companyName:
        producerData.companyName || "",

      document:
        producerData.document || "",

      bio:
        producerData.bio || "",
    },
 

   
  })

async function onSubmit(
  data: ProfileFormData
) {

  const result =
    await updateProfileAction(
      data
    )

  console.log(result)
}
  return (

    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-6"
    >

      {/* CARD */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">

        <h3 className="text-sm font-black uppercase italic tracking-tight text-zinc-900 mb-6">

          Informações Pessoais

        </h3>

        <div className="flex flex-col md:flex-row gap-8 items-start">

          <div className="relative group">

            <div className="size-24 bg-zinc-100 rounded-3xl border border-zinc-200 flex items-center justify-center overflow-hidden">

              <span className="text-2xl font-black text-zinc-300">

               <img src={session?.user?.image} alt={session?.user?.name} className="w-full h-full object-cover" />

              </span>

            </div>

            <button
              type="button"
              className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-xl"
            >

              <Camera className="size-4" />

            </button>

          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="space-y-1.5">

              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">

                Nome Completo

              </label>

              <input
                {...register(
                  "fullName"
                )}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none"
              />

              {errors.fullName && (

                <p className="text-red-500 text-xs">

                  {
                    errors
                      .fullName
                      .message
                  }

                </p>
              )}

            </div>

            <div className="space-y-1.5">

              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">

                E-mail

              </label>

              <input
                type="email"

                {...register(
                  "email"
                )}

                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none"
              />

              {errors.email && (

                <p className="text-red-500 text-xs">

                  {
                    errors
                      .email
                      .message
                  }

                </p>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* PRODUTORA */}

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">

        <h3 className="text-sm font-black uppercase italic tracking-tight text-zinc-900 mb-6">

          Sua Produtora

        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-1.5">

            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">

              Nome da Empresa

            </label>

            <input
              {...register(
                "companyName"
              )}

              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none"
            />

          </div>

          <div className="space-y-1.5">

            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">

              CNPJ / CPF

            </label>

            <input
              {...register(
                "document"
              )}

              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none"
            />

          </div>

          <div className="md:col-span-2 space-y-1.5">

            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">

              Bio

            </label>

            <textarea
              rows={3}

              {...register(
                "bio"
              )}

              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none resize-none"
            />

          </div>

        </div>

      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2"
      >

        <Save className="size-4" />

        Salvar Alterações

      </button>

    </form>
  )
}