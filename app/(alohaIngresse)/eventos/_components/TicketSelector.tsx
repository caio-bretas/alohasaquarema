"use client";

import { useState } from "react";
import { Plus, Minus, Ticket } from "lucide-react";
import { MapaEventos } from "./MapaEventos";

export function TicketSelector() {
  const [activeTab, setActiveTab] = useState<'pista' | 'camarote'>('pista');
  const [selectedCamarote, setSelectedCamarote] = useState<any>(null);
  const [qtyPista, setQtyPista] = useState(0);

  const total = activeTab === 'pista' ? qtyPista * 40 : (selectedCamarote?.preco || 0);

  return (
    <div className="space-y-5">
      {/* Tabs Estilo SaaS */}
      <div className="flex bg-zinc-100/80 p-1 rounded-xl gap-1">
        {['pista', 'camarote'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            {tab === 'pista' ? 'Pista / VIP' : 'Camarotes'}
          </button>
        ))}
      </div>

      {activeTab === 'pista' ? (
        <div className="p-4 rounded-xl border border-zinc-200 bg-white flex justify-between items-center shadow-sm">
          <div>
            <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight">Pista Individual</h4>
            <p className="text-sm font-black text-zinc-900 mt-0.5">R$ 40,00</p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-50 p-1 rounded-lg border border-zinc-100">
            <button onClick={() => setQtyPista(Math.max(0, qtyPista - 1))} className="size-7 flex items-center justify-center bg-white rounded-md border border-zinc-200 shadow-sm active:scale-95"><Minus className="size-3" /></button>
            <span className="w-5 text-center text-xs font-bold">{qtyPista}</span>
            <button onClick={() => setQtyPista(qtyPista + 1)} className="size-7 flex items-center justify-center bg-zinc-900 text-white rounded-md active:scale-95"><Plus className="size-3" /></button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-300">
          <MapaEventos onSelect={(c) => setSelectedCamarote(c)} />
          {selectedCamarote && (
            <div className="p-3 bg-zinc-900 rounded-xl text-white flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase italic px-2">Camarote {selectedCamarote.numero}</span>
              <span className="text-xs font-black bg-white/10 px-3 py-1 rounded-lg">R$ {selectedCamarote.preco.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}

      {/* Checkout Section */}
      <div className="pt-4 border-t border-zinc-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Subtotal</span>
            <span className="text-2xl font-black text-zinc-900 italic leading-none">R$ {total.toFixed(2)}</span>
          </div>
          <p className="text-[8px] text-zinc-400 font-medium uppercase text-right leading-tight max-w-[70px]">Taxas calculadas no próximo passo</p>
        </div>
        
        <button 
          disabled={total === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
        >
          <Ticket className="size-4" />
          Reservar Agora
        </button>
      </div>
    </div>
  );
}