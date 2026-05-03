// app/(produtoraloha)/dashboard/meventos/page.tsx

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

import Link from "next/link"

import {
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { EventCard } from "./_components/EventCard"

export default async function MeusEventosPage() {

  const session =
    await auth()

  if (!session?.user?.id) {
    return null
  }

  const user =
    await prisma.user.findUnique({

      where: {
        id: session.user.id,
      },

      include: {
        producer: true,
      },
    })

  if (!user?.producer) {
    return null
  }

  const events =
    await prisma.event.findMany({

      where: {
        producerId:
          user.producer.id,
      },

      include: {

        orders: {
          where: {
            status: "PAID",
          },
        },

      },

      orderBy: {
        createdAt: "desc",
      },
    })

  const formattedEvents =
    events.map((event) => {

      const sold =
        event.orders.length

      const revenue =
        event.orders.reduce(
          (acc, order) =>
            acc + order.total,
          0
        )

      return {

        id: event.id,

        name: event.title,

        date:
          new Date(
            event.startDate
          ).toLocaleDateString(
            "pt-BR",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),

        location:
          `${event.venueName}, ${event.city}`,

        sold,

        total:
          event.capacity,

        revenue,

        image:
          event.coverImageUrl,

        status:
          event.status ===
          "PUBLISHED"

            ? "active"

            : event.status ===
              "DRAFT"

            ? "draft"

            : "finished",
      }
    })

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

        <div>

          <h1 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none">

            Meus Eventos
            <span className="text-blue-600">
              .
            </span>

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

          <span className="text-xs font-black uppercase tracking-widest">

            Criar Evento

          </span>

        </Link>

      </div>

      {/* TOOLS */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />

          <input
            type="text"
            placeholder="Buscar por nome ou local..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl text-sm outline-none"
          />

        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500">

          <SlidersHorizontal className="size-4" />

          Filtros

        </button>

      </div>

      {/* EVENTS */}
      <div className="grid grid-cols-1 gap-4">

        {formattedEvents.length >
        0 ? (

          formattedEvents.map(
            (event) => (

              <EventCard
                key={event.id}
                event={event as any}
              />

            )
          )

        ) : (

          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-3xl text-zinc-400">

            <p className="text-xs font-black uppercase tracking-widest">

              Nenhum evento encontrado

            </p>

          </div>

        )}

      </div>

    </div>
  )
}