"use client"

import { useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// UI Components (Certifique-se de que os caminhos estão corretos)
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, CheckCircle, Save, AlertCircle } from "lucide-react"

// Schemas
import { step1Schema } from "./schemas/schemabasic"
import { step2Schema } from "./schemas/schemamidiainfo"
import { step3Schema } from "./schemas/schemarules"
import { step4Schema } from "./schemas/schemalote"

// Steps
import { BasicInfoStep } from "./steps/BasicInfoStep"
import { LocationMediaStep } from "./steps/LocationMediaStep"
import { ScheduleRulesStep } from "./steps/ScheduleRulesStep"
import { TicketsStep } from "./steps/TicketsStep"
import { ReviewStep } from "./steps/ReviewStep"
import { createEventAction } from "./actions/create-event"

// UNIFICAÇÃO DOS SCHEMAS COM COERÇÃO
// Isso força o Zod a converter strings de inputs para números/datas automaticamente
const eventSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
}).extend({
  ageRating: z.coerce.number().min(0),
  capacity: z.coerce.number().min(0).optional(),
  maxPerOrder: z.coerce.number().min(1).default(10),
})

type EventFormValues = z.infer<typeof eventSchema>

const steps = ["Identidade", "Local & Mídia", "Cronograma", "Ingressos", "Revisão"]

export default function CreateEventWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema as any),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      category: "OUTRO" as any,
      description: "",
      ageRating: 18,
      isPrivate: false,
      tags: [],
      venueName: "",
      zipCode: "",
      address: "",
      city: "Saquarema",
      state: "RJ",
      coverImageUrl: "",
      bannerImageUrl: "",
      galleryUrls: [],
      maxPerOrder: 10,
      requiresCpf: true,
      allowTransfer: true,
      absorveFee: false,
      ticketTypes: []
    }
  })

  // DEBUG DE ERROS: Se o formulário não avançar, olhe o console do navegador (F12)
  useEffect(() => {
    if (Object.keys(methods.formState.errors).length > 0) {
      console.log("❌ Erros de Validação Atuais:", methods.formState.errors)
    }
  }, [methods.formState.errors])

  const handleNext = async () => {
    // Lista exata de campos para validar em cada etapa
    const fieldsByStep: Record<number, (keyof EventFormValues)[]> = {
      0: ["title", "slug", "category", "description", "ageRating"],
      1: ["venueName", "zipCode", "address", "city", "state"],
      2: ["startDate", "endDate", "salesStartAt", "salesEndAt", "capacity"],
      3: ["ticketTypes"],
    }

    const fieldsToValidate = fieldsByStep[currentStep]
    
    if (fieldsToValidate) {
      const isValid = await methods.trigger(fieldsToValidate)
      if (isValid) {
        setCurrentStep(prev => prev + 1)
        window.scrollTo(0, 0)
      } else {
        // Tenta focar no primeiro erro encontrado
        const firstError = Object.keys(methods.formState.errors)[0]
        console.warn(`Avanço bloqueado pelo campo: ${firstError}`)
      }
    } else {
      // Se for o passo de revisão (último), apenas avança
      setCurrentStep(prev => prev + 1)
    }
  }

const onSubmit = async (data: EventFormValues) => {
  // Opcional: Mostrar um loading state aqui
  const result = await createEventAction(data)

  if (result?.error) {
    // Use um toast para avisar o usuário
    console.error(result.error)
    alert(result.error)
  }
}

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* STEPPER UI */}
        <div className="mb-10 flex items-center justify-between px-4">
          {steps.map((label, index) => (
            <div key={label} className="flex flex-col items-center flex-1 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 z-10 ${
                index <= currentStep ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-slate-200 text-slate-400'
              }`}>
                {index < currentStep ? <CheckCircle size={20} /> : index + 1}
              </div>
              <span className={`text-[9px] mt-2 font-bold uppercase tracking-widest hidden md:block ${index <= currentStep ? 'text-indigo-600' : 'text-slate-400'}`}>
                {label}
              </span>
              {index !== steps.length - 1 && (
                <div className="absolute top-5 left-[50%] w-full h-[2px] -z-0">
                  <div className={`h-full transition-all duration-500 ${index < currentStep ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit as any)} className="p-8 md:p-12">
              
              <div className="min-h-[450px]">
                {currentStep === 0 && <BasicInfoStep />}
                {currentStep === 1 && <LocationMediaStep />}
                {currentStep === 2 && <ScheduleRulesStep />}
                {currentStep === 3 && <TicketsStep />}
                {currentStep === 4 && <ReviewStep />}
              </div>

              {/* NAVEGAÇÃO */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 0}
                  className="rounded-xl px-8"
                >
                  <ChevronLeft className="mr-2" size={18} /> Voltar
                </Button>

                <div className="flex flex-col items-end gap-2">
                  {/* Alerta Visual de Erro */}
                  {Object.keys(methods.formState.errors).length > 0 && (
                    <span className="text-red-500 text-[10px] font-bold flex items-center gap-1 animate-pulse">
                      <AlertCircle size={12} /> Existem campos inválidos neste passo
                    </span>
                  )}

                  {currentStep < steps.length - 1 ? (
                    <Button 
                      type="button" 
                      onClick={handleNext}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-10 h-12 shadow-lg active:scale-95 transition-all"
                    >
                      Próximo Passo <ChevronRight className="ml-2" size={18} />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-10 h-12 shadow-lg"
                    >
                      <Save className="mr-2" size={18} /> Finalizar e Publicar
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}