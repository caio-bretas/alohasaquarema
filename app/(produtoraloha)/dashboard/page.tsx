import { Plus } from "lucide-react";
import { StatsGrid } from "./_components/StatsGrid";
import { ActiveEvents } from "./_components/ActiveEvents";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none">
            Dashboard<span className="text-blue-600">.</span>
          </h1>
          <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-2">
            Bem-vindo de volta, <span className="text-zinc-900">Diego</span>. Seus eventos em Saquarema estão performando bem.
          </p>
        </div>
        
        <Link 
          href="/dashboard/eventos/novo" 
          className="bg-zinc-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 group"
        >
          <Plus className="size-4 text-blue-400 group-hover:rotate-90 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Criar Novo Evento</span>
        </Link>
      </section>

      {/* METRICS */}
      <StatsGrid />

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LISTA DE EVENTOS (MAIOR) */}
        <div className="lg:col-span-2">
          <ActiveEvents />
        </div>

        {/* SIDEBAR DE INSIGHTS (MENOR) */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Dica de Performance</h3>
               <p className="text-sm font-bold leading-relaxed italic">
                 "Eventos com 'Lote Promocional' vendem 40% mais rápido nas primeiras 24h em Saquarema."
               </p>
             </div>
             {/* Efeito visual de fundo */}
             <div className="absolute -right-4 -bottom-4 size-24 bg-white/10 rounded-full blur-2xl" />
          </div>

          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 italic">Atividade Recente</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="size-2 rounded-full bg-blue-600 mt-1.5" />
                  <p className="text-[11px] font-bold text-zinc-600 leading-tight">
                    Novo ingresso vendido para <span className="text-zinc-900">Samba do Amor</span> via WhatsApp.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}