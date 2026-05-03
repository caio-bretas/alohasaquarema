"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { TicketModal } from "./ticket-modal"
import { TicketCard } from "./favorite-card"

type TicketType = {
  id: string

  title: string

  location: string

  date: string

  hour: string

  image: string

  qrCode: string

  status: string

  sector: string
}

interface TicketsPageProps {
  tickets: TicketType[]
}

export default function TicketsPage({
  tickets,
}: TicketsPageProps) {

  const [selectedTicket, setSelectedTicket] =
    useState<TicketType | null>(null)

  return (
    <div className="min-h-screen bg-zinc-50/50 w-full pb-32">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 py-6 flex items-center justify-between">

        <Link
          href="/"
          className="p-3 bg-zinc-900 text-white rounded-2xl active:scale-90 transition-all"
        >
          <ChevronLeft className="size-5" />
        </Link>

        <h1 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-900 italic">
          Meus <span className="text-blue-600">Ingressos</span>
        </h1>

        <div className="size-11" />

      </header>

      <main className="p-4">

        <div className="grid grid-cols-1 gap-6">

          {tickets.map((ticket) => (

            <div
              key={ticket.id}
              onClick={() =>
                setSelectedTicket(ticket)
              }
            >
              <TicketCard ticket={ticket} />
            </div>

          ))}

        </div>

      </main>

      {/* MODAL */}
      {selectedTicket && (

        <TicketModal
          ticket={selectedTicket}
          onClose={() =>
            setSelectedTicket(null)
          }
        />

      )}

    </div>
  )
}