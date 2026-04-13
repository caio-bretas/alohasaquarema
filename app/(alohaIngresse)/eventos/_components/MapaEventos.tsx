"use client";

import { useState } from "react";
import { Map as MapIcon, CheckCircle2 } from "lucide-react";

interface Camarote {
  id: string;
  numero: number;
  status: 'disponivel' | 'ocupado' | 'selecionado';
  preco: number;
}

export function MapaEventos({ onSelect }: { onSelect: (c: Camarote) => void }) {
  const [camarotes] = useState<Camarote[]>([
    { id: 'c1', numero: 1, status: 'disponivel', preco: 1200 },
    { id: 'c2', numero: 2, status: 'ocupado', preco: 1200 },
    { id: 'c3', numero: 3, status: 'disponivel', preco: 1500 },
    { id: 'c4', numero: 4, status: 'disponivel', preco: 1200 },
    { id: 'c5', numero: 5, status: 'disponivel', preco: 1200 },
    { id: 'c6', numero: 6, status: 'ocupado', preco: 1200 },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (camarote: Camarote) => {
    if (camarote.status === 'ocupado') return;
    setSelectedId(camarote.id);
    onSelect(camarote);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <MapIcon className="size-3.5 text-zinc-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Mapa</span>
        </div>
        <div className="flex gap-2 text-[9px] font-bold uppercase text-zinc-400">
          <span className="flex items-center gap-1"><div className="size-1.5 bg-blue-600 rounded-full" /> Livre</span>
          <span className="flex items-center gap-1"><div className="size-1.5 bg-zinc-300 rounded-full" /> Ocupado</span>
        </div>
      </div>

      <div className="relative w-full aspect-[16/10] bg-zinc-50 rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-zinc-900 rounded-b-lg flex items-center justify-center">
          <span className="text-[7px] text-white font-bold uppercase tracking-widest">PALCO</span>
        </div>

        <div className="absolute inset-0 p-6 md:p-10 grid grid-cols-3 gap-2">
          {camarotes.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelect(c)}
              className={`
                relative flex flex-col items-center justify-center rounded-xl border transition-all active:scale-95
                ${c.status === 'ocupado' ? 'bg-zinc-100 border-zinc-200 opacity-40 cursor-not-allowed' : 
                  selectedId === c.id ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 
                  'bg-white border-zinc-200 text-zinc-900 shadow-sm'}
              `}
            >
              <span className="text-[10px] font-bold italic">C{c.numero}</span>
              {selectedId === c.id && <CheckCircle2 className="size-3 mt-0.5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}