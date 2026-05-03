import { Bell, LayoutGrid, MapPin, ChevronRight, Ticket, Calendar, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Assets
import Dg from "@/public/icons/dg.jpg";
import Bl from "@/public/icons/bl.jpg";
import { auth } from "@/lib/auth";
import { CategoriasEventos } from "../(aloha)/event/components/CategoriasEventos";
import { EventCard } from "../(aloha)/event/components/EventCard";
import { FeaturedCarousel } from "../(aloha)/event/components/FeaturedCarousel";
import { BuscarEventos } from "../(aloha)/event/components/BuscarEventos";
import { getEventsAction } from "./actions/get-events";

// Componentes

export default async function Home() {
  const session = await auth();
  const userdata = {
    name: session?.user?.name || "Convidado",
    email: session?.user?.email || "",
    image: session?.user?.image || ""
  };

  const {events, error} = await getEventsAction();
const price = events.map((event) =>
  event.ticketTypes.map((ticketType) =>
    ticketType.batches.map((batch) => batch.price)
  )
)
function formatToBRL(value: number | string) {
  const numberValue = Number(value)

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue)
}

const formattedPrice = formatToBRL(price as any)
console.log("formattedPrice", formattedPrice)
console.log("price", price)
  return (
    <div className="min-h-screen bg-white pb-32 overflow-x-hidden">
      
      {/* HEADER: Centralizado no PC */}
      <header className="bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-6 md:py-8">
          <button className="p-3 bg-zinc-50 border border-zinc-100 rounded-[1.2rem] active:scale-90 transition-all shadow-sm">
            <LayoutGrid className="size-5 text-zinc-900" />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 mb-0.5">Eventos em</span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full border border-blue-100/50">
              <MapPin className="size-3.5 text-blue-600 fill-blue-600/10" /> 
              <span className="text-xs md:text-sm font-black text-blue-700 uppercase tracking-tighter">Saquarema, RJ</span>
            </div>
          </div>

          <button className="p-3 bg-zinc-50 border border-zinc-100 rounded-[1.2rem] active:scale-90 transition-all shadow-sm relative">
            <Bell className="size-5 text-zinc-900" />
            <span className="absolute top-3 right-3 size-2.5 bg-blue-500 rounded-full border-[3px] border-white animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* Wrapper de Conteúdo: Controla a largura no Desktop */}
      <main className="max-w-[1400px] mx-auto px-6 space-y-12 md:space-y-20 mt-4">
        
        {/* BUSCA */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
           <BuscarEventos />
        </section>

        {/* DESTAQUES (CARROSSEL) */}
        <section className="animate-in fade-in zoom-in-95 duration-1000">
          <FeaturedCarousel  events={events}/>
        </section>

        {/* CATEGORIAS */}
        <section className="space-y-6 md:space-y-10">
          <div className="flex items-center justify-between">
            <div>
               <h2 className="text-lg md:text-3xl font-black text-zinc-900 uppercase tracking-tighter italic">Explorar por</h2>
               <div className="h-1 w-8 bg-blue-600 rounded-full mt-1" />
            </div>
            <Link href="/eventos" className="flex items-center gap-1 text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
              Ver Agenda <ChevronRight className="size-3 md:size-4" />
            </Link>
          </div>
          <CategoriasEventos />
        </section>

        {/* FEED DE INGRESSOS */}
       <section className="pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
            
            {error && (
              <div className="col-span-full p-4 bg-red-50 text-red-600 rounded-2xl text-center">
                {error}
              </div>
            )}

     {events.length > 0 ? (
  events.map((event) => {

    const lowestPrice =
      event.ticketTypes
        ?.flatMap((ticket) => ticket.batches)
        ?.sort((a, b) => a.price - b.price)[0]?.price

    function formatToBRL(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value)
    }

    console.log("eventos: ",event)
    return (
      <EventCard
        key={event.id}
        id={event.id}
        image={event.coverImageUrl || "/benner.png"}
        title={event.title}
        price={
          lowestPrice
            ? formatToBRL(lowestPrice)
            : "Grátis"
        }
        date={new Date(event.salesStartAt as any).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
        })}
        location={event.address}
      />
    )
  })
) : (
  !error && (
    <div className="col-span-full py-20 text-center">
      <p className="text-zinc-400 font-bold uppercase tracking-widest italic">
        Nenhum evento disponível no momento.
      </p>
    </div>
  )
)}
          </div>
        </section>
      </main>
    </div>
  );
}