"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2, Zap } from "lucide-react";
import { FormField } from "../ui/fields";

// Este componente gerencia UM único ingresso e seus lotes
export function TicketItem({ ticketIndex, removeTicket }: { ticketIndex: number, removeTicket: (i: number) => void }) {
  const { control, register } = useFormContext();
  
  // O Hook de lotes (batches) agora está seguro aqui dentro
  const { fields: batchFields } = useFieldArray({
    control,
    name: `ticketTypes.${ticketIndex}.batches`
  });

  return (
    <div className="group border border-zinc-200 rounded-3xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
      {/* IDs Ocultos para o Zod */}
      <input type="hidden" {...register(`ticketTypes.${ticketIndex}.id`)} />
      <input type="hidden" {...register(`ticketTypes.${ticketIndex}.isVip`)} />
      {batchFields.map((batch, batchIndex) => (
         <input key={batch.id} type="hidden" {...register(`ticketTypes.${ticketIndex}.batches.${batchIndex}.id`)} />
      ))}

      <div className="flex items-center gap-4 px-6 py-4 bg-zinc-50 border-b border-zinc-100">
        <div className="relative size-8 shrink-0">
          <input 
            type="color" 
            {...register(`ticketTypes.${ticketIndex}.color`)} 
            className="absolute inset-0 size-full cursor-pointer rounded-lg border-none bg-transparent" 
          />
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <Zap className="size-3 text-white mix-blend-difference" />
          </div>
        </div>

        <input 
          {...register(`ticketTypes.${ticketIndex}.name`)} 
          placeholder="Nome do Ingresso (Ex: VIP)" 
          className="flex-1 bg-transparent font-black text-zinc-800 outline-none text-lg"
        />

        <button type="button" onClick={() => removeTicket(ticketIndex)} className="p-2 text-zinc-300 hover:text-red-500">
          <Trash2 className="size-5" />
        </button>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FormField 
            name={`ticketTypes.${ticketIndex}.amenities`} 
            label="Benefícios" 
          />
        </div>

        <div className="space-y-4">
          {/* Pegamos sempre o primeiro lote (batches.0) conforme seu schema simplificado na UI */}
          <FormField 
            name={`ticketTypes.${ticketIndex}.batches.0.price`} 
            label="Preço (R$)" 
            type="number"
          />
          <FormField 
            name={`ticketTypes.${ticketIndex}.batches.0.quantity`} 
            label="Qtd. Disponível" 
            type="number"
          />
          {/* Nome do lote obrigatório no Zod */}
          <input type="hidden" {...register(`ticketTypes.${ticketIndex}.batches.0.name`)} value="Lote Único" />
          <input type="hidden" {...register(`ticketTypes.${ticketIndex}.batches.0.maxPerOrder`)} value="5" />
        </div>
      </div>
    </div>
  );
}