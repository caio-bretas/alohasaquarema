"use client";

import { Info, MapPin, Ticket, ShieldAlert, ChevronDown } from "lucide-react";
import { useState } from "react";

export function EventContent({ description }: { description: string }) {
  const [showFullTerms, setShowFullTerms] = useState(false);

  return (
    <div className="space-y-12 pb-10">
      
      {/* 1. DESCRIÇÃO DO EVENTO (Dinâmico) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
          <Info className="size-4 text-blue-600" />
          <h2 className="text-xs font-black uppercase tracking-tighter italic text-zinc-900">Informações do Evento</h2>
        </div>
        <div className="prose prose-zinc max-w-none">
          <p className="text-sm leading-relaxed text-zinc-600 whitespace-pre-line">
            {description}
          </p>
        </div>
      </section>

      {/* 2. PONTOS DE VENDA (Fixo/Expandível) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
          <MapPin className="size-4 text-blue-600" />
          <h2 className="text-xs font-black uppercase tracking-tighter italic text-zinc-900">Pontos de Venda Físicos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Exemplo de Ponto de Venda */}
          <div className="p-3 rounded-xl border border-zinc-100 bg-zinc-50/50">
            <p className="text-[10px] font-black text-blue-600 uppercase">Saquarema / RJ</p>
            <p className="text-xs font-bold text-zinc-800 mt-1">Loja South - Bacaxá</p>
            <p className="text-[10px] text-zinc-500">Rua Prof. Francisco Fonseca, 433</p>
          </div>
          <div className="p-3 rounded-xl border border-zinc-100 bg-zinc-50/50">
            <p className="text-[10px] font-black text-blue-600 uppercase">Araruama / RJ</p>
            <p className="text-xs font-bold text-zinc-800 mt-1">Loja South - Centro</p>
            <p className="text-[10px] text-zinc-500">Rua Rosa Raposo, 150</p>
          </div>
        </div>
      </section>

      {/* 3. TERMOS E POLÍTICAS (Padrão SaaS/Guichê) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
          <ShieldAlert className="size-4 text-blue-600" />
          <h2 className="text-xs font-black uppercase tracking-tighter italic text-zinc-900">Termos e Condições</h2>
        </div>
        
        <div className={`relative overflow-hidden transition-all duration-500 ${showFullTerms ? 'max-h-[2000px]' : 'max-h-40'}`}>
          <ul className="space-y-3 text-[11px] text-zinc-500 leading-normal list-decimal pl-4">
            <li>A plataforma é intermediária; a responsabilidade do evento é do organizador.</li>
            <li>Classificação etária: 18 anos (obrigatório documento com foto).</li>
            <li>Cancelamentos: Até 7 dias após a compra e 48h antes do evento.</li>
            <li>O ingresso digital via App é obrigatório para entrada.</li>
            <li>Compras suspeitas de fraude serão canceladas automaticamente.</li>
            {/* ... Adicione os outros 10 pontos aqui ... */}
          </ul>

          {!showFullTerms && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        <button 
          onClick={() => setShowFullTerms(!showFullTerms)}
          className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase hover:underline"
        >
          {showFullTerms ? 'Ver menos' : 'Ler termos completos'}
          <ChevronDown className={`size-3 transition-transform ${showFullTerms ? 'rotate-180' : ''}`} />
        </button>
      </section>

    </div>
  );
}