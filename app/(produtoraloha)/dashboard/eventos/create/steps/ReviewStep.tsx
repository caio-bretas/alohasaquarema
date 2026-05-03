"use client";
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckCircle2, Calendar, MapPin, Ticket, Layout, Eye } from 'lucide-react';

export function ReviewStep() {
  const { watch } = useFormContext();
  const data = watch(); // Puxa todos os dados preenchidos

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center space-y-2">
        <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Revise seu Evento</h2>
        <p className="text-slate-500">Confira se todas as informações estão corretas antes de publicar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Básico */}
        <ReviewCard icon={<Layout size={18}/>} title="Identidade">
          <p className="font-bold text-indigo-600">{data.title}</p>
          <p className="text-xs text-slate-500 line-clamp-2">{data.description}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded uppercase font-bold">{data.category}</span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded uppercase font-bold">{data.ageRating}+ anos</span>
          </div>
        </ReviewCard>

        {/* Card: Localização */}
        <ReviewCard icon={<MapPin size={18}/>} title="Local e Endereço">
          <p className="font-medium text-slate-700">{data.venueName}</p>
          <p className="text-xs text-slate-500">{data.address}</p>
          <p className="text-xs text-slate-500">{data.city}, {data.state} - {data.zipCode}</p>
        </ReviewCard>

        {/* Card: Datas */}
        <ReviewCard icon={<Calendar size={18}/>} title="Datas">
          <div className="text-xs text-slate-600 space-y-1">
            <p><b>Início:</b> {new Date(data.startDate).toLocaleString('pt-BR')}</p>
            <p><b>Vendas:</b> {new Date(data.salesStartAt).toLocaleString('pt-BR')}</p>
            <p><b>Privacidade:</b> {data.isPrivate ? "Privado" : "Público"}</p>
          </div>
        </ReviewCard>

        {/* Card: Ingressos */}
        <ReviewCard icon={<Ticket size={18}/>} title="Ingressos">
          <div className="space-y-2">
            {data.ticketTypes?.map((t: any, i: number) => (
              <div key={i} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-xs font-bold text-slate-700">{t.name}</span>
                <span className="text-xs text-indigo-600 font-mono">
                  {t.batches?.length} Lote(s)
                </span>
              </div>
            ))}
          </div>
        </ReviewCard>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
        <CheckCircle2 className="text-amber-500 shrink-0" size={20} />
        <p className="text-xs text-amber-800 leading-relaxed">
          Ao clicar em <b>Finalizar e Publicar</b>, seu evento será criado como <b>Rascunho (DRAFT)</b>. Você poderá fazer alterações finas no dashboard antes de abrir as vendas oficialmente.
        </p>
      </div>
    </div>
  );
}

function ReviewCard({ children, title, icon }: { children: React.ReactNode, title: string, icon: React.ReactNode }) {
  return (
    <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-3">
      <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
        {icon} {title}
      </div>
      <div>{children}</div>
    </div>
  );
}