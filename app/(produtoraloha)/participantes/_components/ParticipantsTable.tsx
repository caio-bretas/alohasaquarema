"use client";

import { MoreHorizontal, Mail, CheckCircle2, Clock } from "lucide-react";

const PARTICIPANTS = [
  { id: "1", name: "Gabriel Menezes", email: "gabriel@email.com", ticket: "Área VIP", batch: "2º Lote", status: "pago", checkin: true },
  { id: "2", name: "Mariana Souza", email: "mari@email.com", ticket: "Pista", batch: "1º Lote", status: "pago", checkin: false },
  { id: "3", name: "Lucas Rocha", email: "lucas@email.com", ticket: "Lounge Deck", batch: "Promocional", status: "pendente", checkin: false },
];

export function ParticipantsTable() {
  return (
    <div className="space-y-4">
      {/* VIEW PARA DESKTOP (TABELA) */}
      <div className="hidden md:block bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Participante</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Ingresso / Lote</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Pagamento</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Check-in</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {PARTICIPANTS.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-zinc-900">{p.name}</p>
                    <p className="text-[10px] text-zinc-400 font-medium">{p.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-zinc-700 italic uppercase tracking-tighter">{p.ticket}</span>
                      <span className="text-[9px] text-zinc-400 font-bold uppercase">{p.batch}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      p.status === 'pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`size-2.5 rounded-full ${p.checkin ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-zinc-200'}`} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400 transition-colors">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW PARA MOBILE (LISTA DE CARDS) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {PARTICIPANTS.map((p) => (
          <div key={p.id} className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className={`size-10 rounded-xl flex items-center justify-center border ${p.checkin ? 'bg-emerald-50 border-emerald-100' : 'bg-zinc-50 border-zinc-100'}`}>
                   {p.checkin ? <CheckCircle2 className="size-5 text-emerald-600" /> : <Clock className="size-5 text-zinc-400" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 leading-none">{p.name}</h3>
                  <p className="text-[10px] text-zinc-400 mt-1">{p.email}</p>
                </div>
              </div>
              <button className="p-1.5 bg-zinc-50 rounded-lg"><MoreHorizontal className="size-4 text-zinc-400" /></button>
            </div>

            <div className="flex justify-between items-end border-t border-zinc-50 pt-3">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Ingresso</p>
                <p className="text-[10px] font-black text-zinc-900 uppercase italic leading-none">{p.ticket}</p>
                <p className="text-[9px] text-zinc-500 font-bold uppercase">{p.batch}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                p.status === 'pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}>
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}