"use client";

import { Calendar, Download, RefreshCcw } from "lucide-react";
import { ConversionCards } from "./_components/ConversionCards";
import { SalesCharts } from "./_components/SalesCharts";

export default function RelatoriosPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-10 px-4 md:px-0">
      
      {/* HEADER DINÂMICO: Empilha no mobile */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none">
            Relatórios Detalhados<span className="text-blue-600">.</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
             <span className="text-[10px] md:text-sm text-zinc-500 font-bold uppercase tracking-wider">Análise de:</span>
             <select className="text-xs md:text-sm font-black text-zinc-900 bg-transparent border-none p-0 outline-none cursor-pointer italic max-w-[200px] md:max-w-none truncate">
                <option>Samba do Amor - Edição Saquarema</option>
                <option>Sunset Eletrônico Bacaxá</option>
             </select>
          </div>
        </div>
        
        <div className="flex gap-2 md:gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none justify-center bg-zinc-900 text-white px-4 py-3 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-lg">
            <Download className="size-4 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Relatório PDF</span>
          </button>
          <button className="p-3 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm text-zinc-500">
            <RefreshCcw className="size-4" />
          </button>
        </div>
      </div>

      {/* FILTRO DE DATA GLOBAL: Scroll horizontal no mobile */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        <div className="flex items-center gap-2 md:gap-4 bg-zinc-100/50 p-1.5 rounded-2xl w-max border border-zinc-200/50">
          <button className="px-4 py-2 bg-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm whitespace-nowrap">Hoje</button>
          <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">7 Dias</button>
          <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">30 Dias</button>
          <div className="h-4 w-px bg-zinc-300 mx-1" />
          <button className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-zinc-500 whitespace-nowrap">
            <Calendar className="size-3" /> Personalizado
          </button>
        </div>
      </div>

      <ConversionCards />
      <SalesCharts />

      {/* ORIGEM DE VENDAS: Ajustado para grid responsivo */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 md:p-6 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest italic mb-6">Origem das Vendas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { site: "Instagram Ads", sales: 450, color: "text-pink-600" },
            { site: "WhatsApp", sales: 320, color: "text-emerald-600" },
            { site: "Busca Orgânica", sales: 120, color: "text-blue-600" },
          ].map((origin) => (
            <div key={origin.site} className="flex items-center justify-between md:border-b-0 border-b border-zinc-50 pb-4 md:pb-0">
               <div>
                 <p className="text-xs font-bold text-zinc-900">{origin.site}</p>
                 <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">Canal de Venda</p>
               </div>
               <span className={`text-sm font-black italic ${origin.color}`}>{origin.sales} un.</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}