"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { FormField, SectionTitle } from "../ui/fields";
import { TicketItem } from "./TicketItem";

export function StepTickets() {
  const { control } = useFormContext();
  const { fields: ticketFields, append: addTicket, remove: removeTicket } = useFieldArray({
    control,
    name: "ticketTypes"
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionTitle>Tipos de Ingressos</SectionTitle>

      <div className="grid grid-cols-1 gap-6">
        {ticketFields.map((field, index) => (
          <TicketItem 
            key={field.id} 
            ticketIndex={index} 
            removeTicket={removeTicket} 
          />
        ))}
      </div>

      <button 
        type="button"
        onClick={() => addTicket({ 
          id: crypto.randomUUID(),
           name: `Ingresso ${ticketFields.length + 1}`,
          isVip: false,
          color: "#2563eb", 
          amenities: "", 
          batches: [{ 
            id: crypto.randomUUID(),
            name: "Lote Único", 
            price: 0, 
            quantity: 1,
            maxPerOrder: 5
          }] 
        })}
        className="w-full py-8 border-2 border-dashed border-zinc-200 rounded-3xl text-zinc-400 hover:text-blue-500 hover:border-blue-400 transition-all flex flex-col items-center gap-2"
      >
        <span>+ Adicionar Novo Tipo de Ingresso</span>
      </button>
    </div>
  );
}