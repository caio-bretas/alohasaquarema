"use client";
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Calendar, Clock, Settings, Users, CreditCard, ShieldCheck } from 'lucide-react';

export function ScheduleRulesStep() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();

  // Função auxiliar para os switches
  const Toggle = ({ name, label, description }: { name: string, label: string, description: string }) => (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
      <div className="space-y-0.5">
        <label className="text-sm font-bold text-slate-800">{label}</label>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setValue(name, !watch(name))}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${watch(name) ? 'bg-indigo-600' : 'bg-slate-300'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${watch(name) ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* SEÇÃO: CRONOGRAMA */}
      <section className="space-y-6">
        <div className="border-b pb-4 flex items-center gap-2">
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Datas e Horários</h2>
            <p className="text-slate-500 text-sm">Quando o evento acontece e quando as vendas abrem.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2"><Clock size={14}/> Início do Evento</label>
            <input type="datetime-local" {...register('startDate')} className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2"><Clock size={14}/> Término do Evento</label>
            <input type="datetime-local" {...register('endDate')} className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2"><Users size={14}/> Abertura dos Portões</label>
            <input type="datetime-local" {...register('doorsOpenAt')} className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-600">Início das Vendas</label>
            <input type="datetime-local" {...register('salesStartAt')} className="w-full p-3 rounded-xl border border-indigo-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-600">Fim das Vendas</label>
            <input type="datetime-local" {...register('salesEndAt')} className="w-full p-3 rounded-xl border border-indigo-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Capacidade Total</label>
            <input type="number" {...register('capacity')} placeholder="Ex: 500" className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
      </section>

      {/* SEÇÃO: REGRAS E CONFIGURAÇÕES */}
      <section className="space-y-6">
        <div className="border-b pb-4 flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <Settings size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Regras do Evento</h2>
            <p className="text-slate-500 text-sm">Configure as políticas de compra e taxas.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Toggle 
            name="requiresCpf" 
            label="Exigir CPF na Compra" 
            description="Aumenta a segurança e evita fraudes." 
          />
          <Toggle 
            name="allowTransfer" 
            label="Permitir Transferência" 
            description="O cliente pode transferir o ingresso para outro." 
          />
          <Toggle 
            name="absorveFee" 
            label="Absorver Taxa (10%)" 
            description="Você paga a taxa, o cliente vê o preço cheio." 
          />
          
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
            <div className="space-y-0.5">
              <label className="text-sm font-bold text-slate-800">Máximo por Pedido</label>
              <p className="text-xs text-slate-500">Limite de ingressos por CPF.</p>
            </div>
            <input 
              type="number" 
              {...register('maxPerOrder')}
              className="w-16 p-2 rounded-lg border border-slate-200 text-center font-bold outline-none"
            />
          </div>
        </div>
      </section>

      {/* ALERT BOX */}
      <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex gap-3 items-start">
        <ShieldCheck className="text-indigo-600 mt-1" size={20} />
        <p className="text-xs text-indigo-700 leading-relaxed">
          <b>Dica sobre Taxas:</b> Se você <b>não</b> absorver a taxa, ela será somada ao valor do ingresso (Ex: Ingresso R$100 + R$10 de taxa). Se absorver, você recebe R$90 por venda.
        </p>
      </div>
    </div>
  );
}