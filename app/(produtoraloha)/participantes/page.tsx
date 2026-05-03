import Link from "next/link"
import Image from "next/image"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Calendar, MapPin, Users, ChevronRight, LayoutDashboard } from "lucide-react"

export default async function ParticipantesPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-black uppercase italic text-zinc-400">
        Não autorizado
      </div>
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      producer: {
        include: {
          events: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  })

  if (!user || !user.producer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-black uppercase italic text-zinc-400">
        Produtor não encontrado
      </div>
    )
  }

  const events = user.producer.events

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* Header Estilizado */}
      <header className="bg-white border-b border-zinc-100 mb-10">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 text-blue-600 mb-2">
            <LayoutDashboard className="size-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Painel do Produtor</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900">
            Meus <span className="text-blue-600">Eventos</span>
          </h1>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-2">
            Selecione um evento para gerenciar os participantes
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/participantes/${event.id}`}
              className="group relative bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col md:flex-row items-center p-3"
            >
              {/* Imagem do Evento */}
              <div className="relative h-44 w-full md:w-64 rounded-[2rem] overflow-hidden flex-shrink-0">
                <img
                  src={event.coverImageUrl || "/placeholder-event.jpg"} // Fallback caso não tenha imagem
                  alt={event.title}
                  
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 md:hidden" />
              </div>

              {/* Conteúdo */}
              <div className="flex-1 px-6 py-4 space-y-4 w-full">
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 uppercase italic tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <MapPin className="size-3.5 text-blue-500" />
                      <span className="text-[10px] font-bold uppercase tracking-tight truncate max-w-[150px]">
                        {event.venueName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Calendar className="size-3.5 text-blue-500" />
                      <span className="text-[10px] font-bold uppercase tracking-tight">
                        {new Date(event.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                  <div className="flex items-center gap-2">
                    <div className="bg-zinc-100 p-2 rounded-lg">
                      <Users className="size-4 text-zinc-600" />
                    </div>
                    <span className="text-[11px] font-black uppercase italic text-zinc-500">
                      Gerenciar Público
                    </span>
                  </div>
                  
                  <div className="bg-zinc-900 text-white p-3 rounded-2xl group-hover:bg-blue-600 transition-all active:scale-90 shadow-lg">
                    <ChevronRight className="size-5" />
                  </div>
                </div>
              </div>

              {/* Efeito de Ticket (Opcional - Recorte lateral) */}
              <div className="hidden md:block absolute right-[-12px] top-1/2 -translate-y-1/2 size-6 bg-zinc-50 border border-zinc-100 rounded-full" />
            </Link>
          ))}
          
          {events.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-zinc-200">
              <p className="text-zinc-400 font-black uppercase italic tracking-widest">Nenhum evento criado ainda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}