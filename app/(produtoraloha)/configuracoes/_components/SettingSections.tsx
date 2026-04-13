"use client";

import { Save, Camera } from "lucide-react";

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      {/* CARD: INFORMAÇÕES PESSOAIS */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase italic tracking-tight text-zinc-900 mb-6">Informações Pessoais</h3>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group">
            <div className="size-24 bg-zinc-100 rounded-3xl border border-zinc-200 flex items-center justify-center overflow-hidden">
               <span className="text-2xl font-black text-zinc-300">DT</span>
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
              <Camera className="size-4" />
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nome Completo</label>
              <input type="text" defaultValue="Diego Tech" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">E-mail Principal</label>
              <input type="email" defaultValue="diego@aloha.com" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* CARD: PRODUTORA (SAQUAREMA) */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase italic tracking-tight text-zinc-900 mb-6">Sua Produtora</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nome da Empresa</label>
              <input type="text" placeholder="Ex: Aloha Eventos" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">CNPJ / CPF</label>
              <input type="text" placeholder="00.000.000/0001-00" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Bio da Produtora</label>
              <textarea rows={3} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 resize-none" />
            </div>
        </div>
      </div>
    </div>
  );
}