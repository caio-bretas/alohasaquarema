"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Ticket, Percent, DollarSign } from "lucide-react";
import { SectionTitle, FormField, Select } from "../ui/fields";

export function StepCupons() {
  const { control, register } = useFormContext();
  
  // Gerencia o array dinâmico de cupons
  const { fields, append, remove } = useFieldArray({
    control,
    name: "coupons",
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <SectionTitle>Cupons de Desconto</SectionTitle>
        <button
          type="button"
          onClick={() => append({ code: "", type: "PERCENT", value: 0, limit: "" })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
        >
          <Plus className="size-4" />
          Novo Cupom
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <Ticket className="size-8 text-zinc-300" />
          </div>
          <p className="text-sm font-bold text-zinc-500">Nenhum cupom adicionado</p>
          <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">
            Clique no botão acima para criar descontos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {fields.map((field, index) => (
            <div 
              key={field.id} 
              className="relative grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-blue-200 transition-colors"
            >
              {/* Código do Cupom */}
              <div className="md:col-span-4">
                <FormField
                  name={`coupons.${index}.code`}
                  label="Código *"
                  placeholder="Ex: VERAO20"
                  className="uppercase font-mono"
                />
              </div>

              {/* Tipo de Desconto */}
              <div className="md:col-span-3">
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                  Tipo
                </label>
                <div className="flex bg-zinc-100 p-1 rounded-lg">
                  <label className="flex-1">
                    <input
                      type="radio"
                      value="PERCENT"
                      className="sr-only peer"
                      {...register(`coupons.${index}.type`)}
                    />
                    <div className="flex items-center justify-center py-2 rounded-md cursor-pointer transition-all peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-blue-600 text-zinc-500">
                      <Percent className="size-4" />
                    </div>
                  </label>
                  <label className="flex-1">
                    <input
                      type="radio"
                      value="FIXED"
                      className="sr-only peer"
                      {...register(`coupons.${index}.type`)}
                    />
                    <div className="flex items-center justify-center py-2 rounded-md cursor-pointer transition-all peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-blue-600 text-zinc-500">
                      <DollarSign className="size-4" />
                    </div>
                  </label>
                </div>
              </div>

              {/* Valor */}
              <div className="md:col-span-2">
                <FormField
                  name={`coupons.${index}.value`}
                  label="Valor *"
                  type="number"
                  placeholder="0"
                />
              </div>

              {/* Limite de Uso */}
              <div className="md:col-span-2">
                <FormField
                  name={`coupons.${index}.limit`}
                  label="Qtd. Limite"
                  type="number"
                  placeholder="∞"
                />
              </div>

              {/* Botão Remover */}
              <div className="md:col-span-1 flex items-end justify-center pb-2">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remover Cupom"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dica de Especialista */}
      <div className="bg-zinc-900 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10 flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-xl">
            <Ticket className="size-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Dica estratégica para o Aloha</h4>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
              Cupons com códigos curtos e em caixa alta (ex: **ALOHA10**) costumam ter 30% mais conversão em redes sociais.
            </p>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Ticket className="size-32 rotate-12" />
        </div>
      </div>
    </div>
  );
}