// app/(produtoraloha)/dashboard/_components/ActiveEvents.tsx

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function ActiveEvents() {

  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const user = await prisma.user.findUnique({
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

  const events = await prisma.event.findMany({
    where: {
      producerId: user.producer.id,
    },

    include: {
      orders: {
        where: {
          status: "PAID",
        },
      },

      ticketTypes: {
        include: {
          batches: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  })

  function getRevenue(orders: any[]) {
    return orders.reduce(
      (acc, order) => acc + order.total,
      0
    )
  }

  function getSoldPercentage(event: any) {

    const sold =
      event.orders.length

    const capacity =
      event.capacity || 1

    return Math.min(
      Math.round(
        (sold / capacity) * 100
      ),
      100
    )
  }

  function getStatus(event: any) {

    if (event.status === "DRAFT") {
      return "Rascunho"
    }

    if (event.status === "PUBLISHED") {
      return "Vendas Abertas"
    }

    if (event.status === "SOLD_OUT") {
      return "Esgotado"
    }

    return event.status
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">

      <div className="p-6 border-b border-zinc-100 flex items-center justify-between">

        <h2 className="text-sm font-black uppercase italic tracking-tight text-zinc-900">

          Seus Eventos Ativos

        </h2>

        <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all">

          Ver Todos

        </button>

      </div>

      <div className="divide-y divide-zinc-50">

        {events.map((event) => {

          const revenue =
            getRevenue(event.orders)

          const sales =
            getSoldPercentage(event)

          return (
            <div
              key={event.id}
              className="p-5 flex items-center justify-between hover:bg-zinc-50/50 transition-colors"
            >

              <div className="flex items-center gap-4">

                <div className="size-12 overflow-hidden bg-zinc-100 rounded-2xl border border-zinc-200 flex items-center justify-center">

                  {event.coverImageUrl ? (

                    <img
                      src={event.coverImageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <span className="font-black text-zinc-400 text-xs">

                      IMG

                    </span>

                  )}

                </div>

                <div>

                  <h3 className="text-sm font-bold text-zinc-900">

                    {event.title}

                  </h3>

                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">

                    {new Date(
                      event.startDate
                    ).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}{" "}
                    • {event.venueName}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-12">

                <div className="hidden md:block text-right">

                  <p className="text-xs font-black text-zinc-900 uppercase italic">

                    {sales}%

                  </p>

                  <div className="w-24 h-1.5 bg-zinc-100 rounded-full mt-1 overflow-hidden">

                    <div
                      className="h-full bg-blue-600"
                      style={{
                        width: `${sales}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="text-right min-w-20">

                  <p className="text-sm font-black text-zinc-900 italic">

                    {new Intl.NumberFormat(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    ).format(revenue)}

                  </p>

                  <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">

                    {getStatus(event)}

                  </p>

                </div>

              </div>

            </div>
          )
        })}

        {events.length === 0 && (

          <div className="p-10 text-center">

            <p className="text-sm font-bold text-zinc-500">

              Você ainda não criou nenhum evento.

            </p>

          </div>

        )}

      </div>

    </div>
  )
}