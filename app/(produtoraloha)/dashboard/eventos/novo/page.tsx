"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

// Seu schema importado


// Seus steps
import { StepEvento } from "../_components/steps/step-event";
import { StepLocation } from "../_components/steps/step-location";
import { StepTickets } from "../_components/steps/step-tickets";

import { StepReview } from "../_components/steps/step-review";
import { EventFormData, eventSchema } from "../../schema";
import { StepCupons } from "../_components/steps/step-coupons";
import { CreateEventoActions } from "./actions/CreateEventoActions";
import { CreateEventDraft, UpdateEventLocation } from "./actions/CreateEventDraft";

const STEPS = [
  { id: "info", title: "Evento", fields: ["title", "category", "capacity", "startDate", "endDate"] },
  { id: "local", title: "Local", fields: ["venueName", "address", "city", "state"] },
  { id: "tickets", title: "Ingressos", fields: ["ticketTypes"] },
  { id: "cupons", title: "Cupons", fields: ["coupons"] },
  { id: "revisao", title: "Revisão", fields: [] },
];

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventId, setEventId] = useState<string | null>(null);

  const methods = useForm<EventFormData>({
    resolver: zodResolver(eventSchema as any),
    mode: "onChange", // Valida enquanto o usuário digita
    defaultValues: {
      title: "",
      ageRating: "0",
      requiresCpf: true,
      allowTransfer: true,
      absorveFee: false,
      isPrivate: false,
      city: "Saquarema",
      state: "RJ",
     ticketTypes: [{
      id: crypto.randomUUID(),
      name: "Ingresso Geral",
      isVip: false,
      color: "#2563eb",
      amenities: "",
      batches: [{
        id: crypto.randomUUID(),
        name: "Lote 1",
        price: 0,
        quantity: 100,
        maxPerOrder: 5
      }]
    }],
    coupons: [],
    }
  });

  const { trigger, handleSubmit, formState: { errors } } = methods;

const nextStep = async () => {
  const fieldsToValidate = STEPS[currentStep].fields as any[];
  const isStepValid = await trigger(fieldsToValidate);

  if (!isStepValid) return;

  // 🚀 STEP 0 → CRIA EVENTO
  if (currentStep === 0 && !eventId) {
    const data = methods.getValues();

    const id = await CreateEventDraft(data);
    

    setEventId(id);

    console.log("Evento criado:", id);
  }

  if (currentStep === 1 && eventId) {
  const data = methods.getValues();
  await UpdateEventLocation(eventId, data);
  console.log("Local atualizado para o evento:", eventId);
}

  setCurrentStep((prev) => prev + 1);
};
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const onSubmit = async (data: EventFormData) => {
    console.log("Dados Validados pelo Zod:", data);
    await CreateEventoActions(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        
        {/* Stepper Visual */}
        <div className="flex items-center justify-between mb-12 px-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center group">
                <div className={`size-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  index <= currentStep ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-zinc-200 text-zinc-400"
                }`}>
                  {index < currentStep ? <Check className="size-5" /> : index + 1}
                </div>
                <span className={`absolute mt-12 text-[9px] font-black uppercase tracking-tighter ${
                  index <= currentStep ? "text-blue-600" : "text-zinc-400"
                }`}>
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`h-[2px] flex-1 mx-2 rounded-full ${index < currentStep ? "bg-blue-600" : "bg-zinc-100"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
          <div className="min-h-[450px]">
            {currentStep === 0 && <StepEvento />}
            {currentStep === 1 && <StepLocation />}
            {currentStep === 2 && <StepTickets />}
            {currentStep === 3 && <StepCupons />}
            {currentStep === 4 && <StepReview />}
          </div>

          {/* Navegação */}
          <div className="mt-12 flex items-center justify-between bg-zinc-50 p-4 rounded-3xl">
            <button
              type="button"
              onClick={prevStep}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold text-zinc-500 hover:text-zinc-800 transition-all ${
                currentStep === 0 ? "invisible" : "visible"
              }`}
            >
              <ChevronLeft className="size-4" /> Voltar
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95"
              >
                Próximo <ChevronRight className="size-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-200 active:scale-95"
              >
                Finalizar Evento <Check className="size-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}