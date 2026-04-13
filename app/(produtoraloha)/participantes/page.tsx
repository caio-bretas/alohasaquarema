"use client";

import { Search, Download, Filter, UserPlus } from "lucide-react";
import { StatsSummary } from "./_components/StatsSummary";
import { ParticipantsTable } from "./_components/ParticipantsTable";

export default function ParticipantesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-10">
      
      {/* HEADER: Ajustado para mobile (botões full-width) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none">
            Participantes<span className="text-blue-600">.</span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-wider">
            Evento: <span className="text-zinc-900">Samba do Amor - Tá Na Mente</span>
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:flex gap-3">
          <button className="bg-white border border-zinc-200 text-zinc-600 px-4 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all shadow-sm">
            <Download className="size-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Exportar</span>
          </button>
          <button className="bg-zinc-900 text-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-lg">
            <UserPlus className="size-4 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Convidar</span>
          </button>
        </div>
      </div>

      <StatsSummary />

      {/* FERRAMENTAS DE BUSCA: Filtro vira ícone ou botão menor no mobile */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Buscar participante..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-zinc-200 rounded-2xl text-sm outline-none focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">
          <Filter className="size-4" /> Lote: Todos
        </button>
      </div>

      <ParticipantsTable />

      {/* FOOTER: Paginação empilhada no mobile */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest order-2 md:order-1">
          1-10 de 1,240 participantes
        </p>
        <div className="flex gap-2 w-full md:w-auto order-1 md:order-2">
          <button className="flex-1 md:flex-none px-6 py-2.5 border border-zinc-200 rounded-xl text-[10px] font-black uppercase hover:bg-zinc-50">Anterior</button>
          <button className="flex-1 md:flex-none px-6 py-2.5 border border-zinc-200 rounded-xl text-[10px] font-black uppercase hover:bg-zinc-50">Próximo</button>
        </div>
      </div>

    </div>
  );
}