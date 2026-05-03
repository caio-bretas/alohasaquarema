import { getParticipants } from "../../actions/get-participants"
import { ParticipantsTable } from "../_components/ParticipantsTable"
import { StatsSummary } from "../_components/StatsSummary"
import { Users, ChevronLeft, Download } from "lucide-react"
import Link from "next/link"

export default async function ParticipantesPage({
  params,
}: {
  params: Promise<{
    eventId: string
  }>
}) {
  const { eventId } = await params
  const participants = await getParticipants(eventId)

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* Header da Página */}
      <header className="bg-white border-b border-zinc-100 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Users className="size-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Gestão de Evento</span>
              </div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900">
                Lista de <span className="text-blue-600">Participantes</span>
              </h1>
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                Gerencie as confirmações e dados dos usuários
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95">
                <Download className="size-4" />
                Exportar CSV
              </button>
              <Link 
                href="/admin/eventos" 
                className="p-3 bg-zinc-900 text-white rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-zinc-200"
              >
                <ChevronLeft className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Seção de Resumo (Stats) */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em]">Visão Geral</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>
          <StatsSummary participants={participants} />
        </section>

        {/* Seção da Tabela */}
        <section className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="px-8 py-6 border-b border-zinc-50 bg-zinc-50/50 flex items-center justify-between">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 italic">
              Base de Dados
            </h3>
            <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[9px] font-black text-zinc-400">
              {participants.length} REGISTROS
            </span>
          </div>
          
          <div className="p-4">
             <ParticipantsTable participants={participants} />
          </div>
        </section>
      </main>
    </div>
  )
}