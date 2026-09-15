import {
  CalendarDays,
  MapPin,
  Timer,
  ChevronLeft,
  Share2,
  Info,
  ShieldCheck,
  Users,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { TicketSelector } from "../_components/TicketSelector"
import { EventContent } from "../_components/evennt-card"

import { auth } from "@/lib/auth"
import { getEventoById } from "./actions/getEventos"

interface EventoDetalhesProps {
  params: Promise<{
    id: string
  }>
}

export default async function EventoDetalhes({
  params,
}: EventoDetalhesProps) {
  const { id } = await params

  const result = await getEventoById(id)

  if (result.error || !result.data) {
    notFound()
  }

  const evento = result.data
  const session = await auth()

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER MOBILE */}
      <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-between p-6 md:hidden">
        <Link
          href="/"
          className="pointer-events-auto rounded-2xl border border-white/30 bg-white/20 p-3 text-white backdrop-blur-xl transition-all active:scale-90"
        >
          <ChevronLeft className="size-6" />
        </Link>

        <button
          type="button"
          aria-label="Compartilhar evento"
          className="pointer-events-auto rounded-2xl border border-white/30 bg-white/20 p-3 text-white backdrop-blur-xl"
        >
          <Share2 className="size-5" />
        </button>
      </div>

      <div className="mx-auto max-w-[1400px] md:px-6 md:pt-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* ESQUERDA */}
          <div className="space-y-8 lg:col-span-7">
            <div className="relative h-[50vh] w-full overflow-hidden shadow-2xl md:h-[600px] md:rounded-[3.5rem]">
              <img
                src={evento.coverImageUrl || "/benner.png"}
                alt={evento.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute right-8 bottom-10 left-8 md:bottom-12 md:left-12">
                <span className="mb-4 inline-block rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                  {evento.category}
                </span>

                <h1 className="text-4xl leading-[0.9] font-black tracking-tighter text-white uppercase italic drop-shadow-2xl md:text-7xl">
                  {evento.title}
                </h1>
              </div>
            </div>

            <div className="space-y-10 px-6 md:px-2">
              {/* INFORMAÇÕES */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col items-center rounded-[2rem] border border-zinc-100 bg-zinc-50 p-5 text-center">
                  <CalendarDays className="mb-3 size-6 text-blue-600" />

                  <p className="text-[9px] font-black tracking-widest text-zinc-400 uppercase">
                    Data
                  </p>

                  <p className="mt-1 text-sm font-black text-zinc-900">
                    {new Date(evento.startDate).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-[2rem] border border-zinc-100 bg-zinc-50 p-5 text-center">
                  <Timer className="mb-3 size-6 text-blue-600" />

                  <p className="text-[9px] font-black tracking-widest text-zinc-400 uppercase">
                    Início
                  </p>

                  <p className="mt-1 text-sm font-black text-zinc-900">
                    {new Date(evento.startDate).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="hidden flex-col items-center rounded-[2rem] border border-zinc-100 bg-zinc-50 p-5 text-center md:flex">
                  <Users className="mb-3 size-6 text-blue-600" />

                  <p className="text-[9px] font-black tracking-widest text-zinc-400 uppercase">
                    Classificação
                  </p>

                  <p className="mt-1 text-sm font-black text-zinc-900">
                    {evento.ageRating || "18+"}
                  </p>
                </div>

                <div className="hidden flex-col items-center rounded-[2rem] border border-zinc-100 bg-zinc-50 p-5 text-center md:flex">
                  <ShieldCheck className="mb-3 size-6 text-blue-600" />

                  <p className="text-[9px] font-black tracking-widest text-zinc-400 uppercase">
                    Verificado
                  </p>

                  <p className="mt-1 text-sm font-black text-zinc-900">
                    Oficial
                  </p>
                </div>
              </div>

              {/* LOCALIZAÇÃO */}
              <div className="flex items-center justify-between rounded-[2.5rem] border border-zinc-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-5">
                  <div className="rounded-2xl bg-blue-600 p-4 shadow-lg shadow-blue-200">
                    <MapPin className="size-6 text-white" />
                  </div>

                  <div>
                    <p className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                      Localização
                    </p>

                    <p className="text-sm font-bold text-zinc-900 italic md:text-base">
                      {evento.address}, {evento.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* SOBRE */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-10 rounded-full bg-blue-600" />

                  <h2 className="text-lg font-black tracking-tighter text-zinc-900 uppercase italic">
                    Sobre o Evento
                  </h2>
                </div>

                <p className="text-base leading-relaxed font-medium text-zinc-500 md:max-w-3xl">
                  {evento.description || "Nenhuma descrição disponível."}
                </p>
              </div>
            </div>

            <EventContent description={evento.description || ""} />
          </div>

          {/* DIREITA */}
          <aside className="px-6 md:px-0 lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-32">
              <div className="rounded-[3rem] border border-zinc-200 bg-zinc-50 p-8 shadow-xl shadow-zinc-200/50">
                <h3 className="mb-8 text-xl font-black tracking-tighter text-zinc-900 uppercase italic">
                  Adquira seu ingresso agora
                </h3>

                <TicketSelector
                  ticketTypes={evento.ticketTypes}
                  eventId={evento.id}
                  session={session}
                />

                <p className="mt-6 text-center text-[9px] font-bold text-zinc-400 uppercase">
                  Pagamento 100% seguro via PIX ou cartão
                </p>
              </div>

              <div className="flex items-start gap-4 rounded-[2.5rem] border border-zinc-100 bg-white p-6">
                <div className="rounded-xl bg-zinc-100 p-3">
                  <Info className="size-5 text-zinc-500" />
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase italic">
                    Política de Reembolso
                  </h4>

                  <p className="mt-1 text-[10px] leading-relaxed font-medium text-zinc-500">
                    Até 7 dias após a compra e no máximo 48 horas antes do
                    início do evento.
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