import { EventCard } from "@/app/(aloha)/event/components/EventCard"
import { Badge } from "@/components/ui/badge"
import { Ticket } from "lucide-react"
import { getEventsAction } from "../actions/get-events"
import { auth } from "@/lib/auth"



export default async function Eventos() {

  const { events } = await getEventsAction()


  return (
    <div className="flex flex-col p-5 pb-32 min-h-screen w-full bg-white">

      <header className="flex items-center justify-between">

        <div>
          <h1 className="text-xl font-extrabold">
            Próximos Eventos
          </h1>

          <Badge className="rounded-sm bg-blue-500">
            Disponível Agora
          </Badge>
        </div>

        <div>
          <Ticket />
        </div>

      </header>

      <div className="grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">

        {events.map((event) => {

          const lowestPrice =
            event.ticketTypes
              ?.flatMap((ticket) => ticket.batches)
              ?.sort((a, b) => a.price - b.price)[0]?.price

          return (
            <EventCard
              key={event.id}

              id={event.id}

              image={event.coverImageUrl || "/benner.png"}

              title={event.title}

              price={
                lowestPrice
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(lowestPrice)
                  : "Grátis"
              }

              date={new Date(event.startDate).toLocaleDateString(
                "pt-BR",
                {
                  day: "2-digit",
                  month: "short",
                }
              )}

              location={event.address}
            />
          )
        })}

      </div>

    </div>
  )
}