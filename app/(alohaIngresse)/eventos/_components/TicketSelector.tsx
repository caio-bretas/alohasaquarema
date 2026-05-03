"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import {
  Plus,
  Minus,
  Ticket,
  Loader2,
} from "lucide-react"

import { MapaEventos } from "./MapaEventos"

type BatchType = {
  id: string
  name: string
  price: number
}

type TicketType = {
  id: string
  name: string
  isVip: boolean
  batches: BatchType[]
}

interface TicketSelectorProps {
  ticketTypes: TicketType[]
  eventId: string
  session: any
}

export function TicketSelector({
  ticketTypes,
  eventId,
  session,
}: TicketSelectorProps) {

  const router = useRouter()

  const [loading, setLoading] =
    useState(false)

  const [activeTab, setActiveTab] =
    useState<"tickets" | "camarote">(
      "tickets"
    )

  const [selectedCamarote, setSelectedCamarote] =
    useState<any>(null)

  const [quantities, setQuantities] =
    useState<Record<string, number>>({})

  const pistaTickets =
    ticketTypes.filter(
      (ticket) =>
        !ticket.name
          .toLowerCase()
          .includes("camarote")
    )

  function increase(id: string) {

    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  function decrease(id: string) {

    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(
        0,
        (prev[id] || 0) - 1
      ),
    }))
  }

  const total = useMemo(() => {

    let totalValue = 0

    pistaTickets.forEach((ticket) => {

      const quantity =
        quantities[ticket.id] || 0

      const lowestBatch =
        [...ticket.batches]
          .sort(
            (a, b) =>
              a.price - b.price
          )[0]

      if (lowestBatch) {

        totalValue +=
          quantity *
          lowestBatch.price
      }
    })

    return totalValue

  }, [
    quantities,
    pistaTickets,
  ])

async function handleReserve() {

  const items: {
    batchId: string
    quantity: number
  }[] = []

  pistaTickets.forEach((ticket) => {

    const quantity =
      quantities[ticket.id] || 0

    const lowestBatch =
      [...ticket.batches]
        .sort(
          (a, b) =>
            a.price - b.price
        )[0]

    if (
      quantity > 0 &&
      lowestBatch
    ) {

      items.push({
        batchId:
          lowestBatch.id,

        quantity,
      })
    }
  })

  // salva no localStorage
  localStorage.setItem(
    "checkout_data",
    JSON.stringify({
      eventId,
      items,
      total,
      session,
    })
  )

  // vai para checkout
  router.push("/checkout")
}
  return (
    <div className="space-y-5">

      <div className="flex bg-zinc-100/80 p-1 rounded-xl gap-1">

        <button
          onClick={() =>
            setActiveTab("tickets")
          }
          className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
            activeTab === "tickets"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500"
          }`}
        >
          Pista / VIP
        </button>

        <button
          onClick={() =>
            setActiveTab("camarote")
          }
          className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
            activeTab === "camarote"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500"
          }`}
        >
          Camarotes
        </button>

      </div>

      {activeTab === "tickets" ? (

        <div className="space-y-4">

          {pistaTickets.map((ticket) => {

            const lowestBatch =
              [...ticket.batches]
                .sort(
                  (a, b) =>
                    a.price - b.price
                )[0]

            if (!lowestBatch)
              return null

            return (
              <div
                key={ticket.id}
                className="p-4 rounded-xl border border-zinc-200 bg-white flex justify-between items-center shadow-sm"
              >

                <div>

                  <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight">

                    {ticket.name}

                  </h4>

                  <p className="text-sm font-black text-zinc-900 mt-0.5">

                    {new Intl.NumberFormat(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    ).format(
                      lowestBatch.price
                    )}

                  </p>

                </div>

                <div className="flex items-center gap-2 bg-zinc-50 p-1 rounded-lg border border-zinc-100">

                  <button
                    onClick={() =>
                      decrease(ticket.id)
                    }
                    className="size-7 flex items-center justify-center bg-white rounded-md border border-zinc-200"
                  >
                    <Minus className="size-3" />
                  </button>

                  <span className="w-5 text-center text-xs font-bold">

                    {quantities[
                      ticket.id
                    ] || 0}

                  </span>

                  <button
                    onClick={() =>
                      increase(ticket.id)
                    }
                    className="size-7 flex items-center justify-center bg-zinc-900 text-white rounded-md"
                  >
                    <Plus className="size-3" />
                  </button>

                </div>

              </div>
            )
          })}

        </div>

      ) : (

        <MapaEventos
          onSelect={(c) =>
            setSelectedCamarote(c)
          }
        />

      )}

      <div className="pt-4 border-t border-zinc-100">

        <div className="flex justify-between items-center mb-4">

          <div className="flex flex-col">

            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">

              Subtotal

            </span>

            <span className="text-2xl font-black text-zinc-900 italic leading-none">

              {new Intl.NumberFormat(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              ).format(total)}

            </span>

          </div>

        </div>

        <button
          onClick={handleReserve}
          disabled={
            total === 0 ||
            loading
          }
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2"
        >

          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Ticket className="size-4" />
          )}

          {loading
            ? "Criando pedido..."
            : "Reservar Agora"}

        </button>

      </div>

    </div>
  )
}