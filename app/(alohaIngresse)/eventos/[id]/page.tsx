import { 
  CalendarDays, MapPin, Timer, ChevronLeft, 
  Share2, Info, ShieldCheck, Users
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { TicketSelector } from "../_components/TicketSelector"
import { EventContent } from "../_components/evennt-card"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export default async function EventoDetalhes({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
 const session = await auth();
  // Busca evento no banco
  const evento = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      ticketTypes: {
        include: {
          batches: {
            where: {
              status: "ACTIVE",
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  })

  console.log("Evento:", evento)
  if (!evento) return notFound()

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* HEADER MOBILE */}
      <div className="md:hidden fixed top-0 left-0 right-0 p-6 flex justify-between z-50 pointer-events-none">
        <Link
          href="/"
          className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 text-white pointer-events-auto active:scale-90 transition-all"
        >
          <ChevronLeft className="size-6" />
        </Link>

        <button className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 text-white pointer-events-auto">
          <Share2 className="size-5" />
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto md:pt-10 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ESQUERDA */}
          <div className="lg:col-span-7 space-y-8">

            <div className="relative h-[50vh] md:h-[600px] w-full md:rounded-[3.5rem] overflow-hidden shadow-2xl">
              
              <img
                src={evento.coverImageUrl || "/benner.png"}
                alt={evento.title}
                
                className="object-cover w-full h-full"
              
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-10 left-8 right-8 md:left-12 md:bottom-12">
                
                <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-4 inline-block">
                  {evento.category}
                </span>

                <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter italic drop-shadow-2xl">
                  {evento.title}
                </h1>

              </div>
            </div>

            <div className="px-6 md:px-2 space-y-10">

              {/* INFO CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="p-5 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex flex-col items-center text-center">
                  <CalendarDays className="size-6 text-blue-600 mb-3" />

                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">
                    Data
                  </p>

                  <p className="text-sm font-black text-zinc-900 mt-1">
                    {new Date(evento.startDate).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                </div>

                <div className="p-5 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex flex-col items-center text-center">
                  <Timer className="size-6 text-blue-600 mb-3" />

                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">
                    Início
                  </p>

                  <p className="text-sm font-black text-zinc-900 mt-1">
                    {new Date(evento.startDate).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="hidden md:flex p-5 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex-col items-center text-center">
                  <Users className="size-6 text-blue-600 mb-3" />

                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">
                    Classificação
                  </p>

                  <p className="text-sm font-black text-zinc-900 mt-1">
                    {evento.ageRating || "18+"}
                  </p>
                </div>

                <div className="hidden md:flex p-5 bg-zinc-50 rounded-[2rem] border border-zinc-100 flex-col items-center text-center">
                  <ShieldCheck className="size-6 text-blue-600 mb-3" />

                  <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">
                    Verificado
                  </p>

                  <p className="text-sm font-black text-zinc-900 mt-1">
                    Oficial
                  </p>
                </div>
              </div>

              {/* LOCAL */}
              <div className="flex items-center justify-between p-6 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">

                <div className="flex items-center gap-5">

                  <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200">
                    <MapPin className="size-6 text-white" />
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      Localização
                    </p>

                    <p className="text-sm md:text-base font-bold text-zinc-900 italic">
                      {evento.address}, {evento.city}
                    </p>
                  </div>

                </div>
              </div>

              {/* SOBRE */}
              <div className="space-y-6">

                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-10 bg-blue-600 rounded-full" />

                  <h2 className="text-lg font-black text-zinc-900 uppercase tracking-tighter italic">
                    Sobre o Evento
                  </h2>
                </div>

                <p className="text-zinc-500 text-base leading-relaxed font-medium md:max-w-3xl">
                  {evento.description}
                </p>

              </div>
            </div>

            <EventContent
              description={evento.description as string}
            />

          </div>

          {/* DIREITA */}
          <aside className="lg:col-span-5 px-6 md:px-0">

            <div className="lg:sticky lg:top-32 space-y-6">

              <div className="bg-zinc-50 border border-zinc-200 rounded-[3rem] p-8 shadow-xl shadow-zinc-200/50">

                <h3 className="text-xl font-black text-zinc-900 uppercase italic mb-8 tracking-tighter">
                  Adquira seu Ingresso agora
                </h3>

                <TicketSelector
                  ticketTypes={evento.ticketTypes}
                  eventId={evento.id}
                  session={session}
                />

                <p className="text-[9px] text-zinc-400 text-center font-bold uppercase mt-6">
                  Pagamento 100% seguro via PIX ou Cartão
                </p>

              </div>

              <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-6 flex items-start gap-4">

                <div className="bg-zinc-100 p-3 rounded-xl">
                  <Info className="size-5 text-zinc-500" />
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase italic">
                    Política de Reembolso
                  </h4>

                  <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-1">
                    Até 7 dias após a compra e no máximo 48h antes do evento começar.
                  </p>
                </div>

              </div>

            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}