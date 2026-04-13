"use client";

import { useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { EventCard } from "./_components/EventCard";
import Link from "next/link";

// Mock de dados que virão do seu banco futuramente
const MOCK_EVENTS = [
  {
    id: "1",
    name: "Samba do Amor - Tá Na Mente",
    date: "18 ABR 2026 • 21:00H",
    location: "Good Bar, Saquarema",
    sold: 245,
    total: 300,
    revenue: 12450.00,
    status: "active" as const,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=300&h=200&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Sunset Eletrônico Bacaxá",
    date: "12 MAI 2026 • 16:00H",
    location: "Pousada do Sol, Saquarema",
    sold: 45,
    total: 500,
    revenue: 4500.00,
    status: "active" as const,
  },
  {
    id: "3",
    name: "Workshop de Marketing Digital",
    date: "20 MAI 2026 • 09:00H",
    location: "Centro de Convenções",
    sold: 0,
    total: 50,
    revenue: 0,
    status: "draft" as const,
  }
];

export default function MeusEventosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* HEADER DA LISTAGEM */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none">
            Meus Eventos<span className="text-blue-600">.</span>
          </h1>
          <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-2">
            Gerencie suas produções e acompanhe as vendas em tempo real.
          </p>
        </div>
        
        <Link 
          href="/dashboard/eventos/novo" 
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 group"
        >
          <Plus className="size-4 text-white group-hover:rotate-90 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Criar Evento</span>
        </Link>
      </div>

      {/* BARRA DE FERRAMENTAS (BUSCA E FILTRO) */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou local..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 transition-all">
          <SlidersHorizontal className="size-4" /> Filtros
        </button>
      </div>

      {/* LISTA DE EVENTOS */}
      <div className="grid grid-cols-1 gap-4">
        {MOCK_EVENTS.length > 0 ? (
          MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-3xl text-zinc-400">
            <p className="text-xs font-black uppercase tracking-widest">Nenhum evento encontrado</p>
          </div>
        )}
      </div>

    </div>
  );
}