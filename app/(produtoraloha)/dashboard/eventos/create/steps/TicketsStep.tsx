"use client";
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Ticket, Plus, Trash2, Crown, Tags, AlertCircle } from 'lucide-react';

export function TicketsStep() {
  const { register, control, watch, formState: { errors } } = useFormContext();
  
  // Array de Tipos de Ingressos (Pista, VIP...)
  const { fields: ticketFields, append: appendTicket, remove: removeTicket } = useFieldArray({
    control,
    name: "ticketTypes"
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="border-b pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Ingressos e Lotes</h2>
          <p className="text-slate-500 text-sm">Configure os setores e os preços do seu evento.</p>
        </div>
        <button
          type="button"
          onClick={() => appendTicket({ name: "", isVip: false, batches: [{ name: "1º Lote", price: 0, totalQuantity: 100 }] })}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all"
        >
          <Plus size={16} /> Novo Setor
        </button>
      </div>

      {ticketFields.length === 0 && (
        <div className="py-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400">
          <Ticket size={48} className="mb-4 opacity-20" />
          <p>Nenhum setor criado ainda.</p>
        </div>
      )}

      <div className="space-y-6">
        {ticketFields.map((field, ticketIndex) => (
          <TicketTypeCard 
            key={field.id} 
            index={ticketIndex} 
            remove={() => removeTicket(ticketIndex)} 
          />
        ))}
      </div>
    </div>
  );
}

// Sub-componente para cada Tipo de Ingresso
function TicketTypeCard({ index, remove }: { index: number, remove: () => void }) {
  const { register, control } = useFormContext();
  
  // Array de Lotes dentro do Tipo de Ingresso
  const { fields: batchFields, append: appendBatch, remove: removeBatch } = useFieldArray({
    control,
    name: `ticketTypes.${index}.batches`
  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
            <Tags size={18} className="text-indigo-600" />
          </div>
          <input
            {...register(`ticketTypes.${index}.name`)}
            placeholder="Ex: Pista Premium, Camarote..."
            className="bg-transparent font-bold text-slate-800 outline-none focus:ring-b-2 focus:ring-indigo-500"
          />
        </div>
        <button onClick={remove} className="text-slate-400 hover:text-red-500 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex gap-4 items-center">
           <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register(`ticketTypes.${index}.isVip`)} className="rounded text-indigo-600" />
              <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                <Crown size={14} className="text-amber-500" /> Acesso VIP
              </span>
           </label>
        </div>

        {/* Listagem de Lotes */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lotes de Venda</p>
          
          {batchFields.map((batch, batchIndex) => (
            <div key={batch.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 items-end">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Nome do Lote</label>
                <input type='number' {...register(`ticketTypes.${index}.batches.${batchIndex}.name`)} className="w-full p-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Preço (R$)</label>
                <input type="number"
  {...register(`ticketTypes.${index}.price`, { valueAsNumber: true })} // Adicione isso!
  placeholder="0.00"  className="w-full p-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Quantidade</label>
                <input type="number"
  {...register(`ticketTypes.${index}.quantity`, { valueAsNumber: true })} // E isso!
  placeholder="100" className="w-full p-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <button 
                type="button" 
                onClick={() => removeBatch(batchIndex)} 
                disabled={batchFields.length === 1}
                className="p-2.5 text-slate-400 hover:text-red-500 disabled:opacity-30"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendBatch({ name: `${batchFields.length + 1}º Lote`, price: 0, totalQuantity: 100 })}
            className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline pt-2"
          >
            <Plus size={14} /> Adicionar Lote
          </button>
        </div>
      </div>
    </div>
  );
}