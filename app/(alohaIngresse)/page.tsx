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

// Componentes

export default async function Home() {
  const session = await auth();
  const userdata = {
    name: session?.user?.name || "Convidado",
    email: session?.user?.email || "",
    image: session?.user?.image || ""
  };

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
          <FeaturedCarousel />
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
          <div className="mb-8 md:mb-12 flex items-end justify-between border-b border-zinc-100 pb-6">
            <div>
              <h2 className="text-lg md:text-3xl font-black text-zinc-900 uppercase tracking-tighter italic">Próximos Eventos</h2>
              <p className="text-[10px] md:text-xs text-zinc-400 font-bold uppercase mt-1 italic">Ingressos disponíveis agora</p>
            </div>
            <div className="flex gap-3">
               <button className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform">
                  <Calendar className="size-5" />
               </button>
               <button className="p-3 bg-zinc-100 rounded-xl text-zinc-400 hover:bg-zinc-200 transition-colors">
                  <Ticket className="size-5" />
               </button>
            </div>
          </div>
          
          {/* Grid Inteligente: 1 col mobile, 2 tablet, 3/4 PC */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            <EventCard 
              id={1}
              image={Dg.src}
              title="Show Sertanejo Saquarema" 
              price="R$ 45,00" 
              date="20 Jun"
              location="Centro"
            />
            <EventCard 
              id={2}
              image={Bl.src}
              title="Luau de Itaúna" 
              price="Grátis" 
              date="12 Jul"
              location="Beira Mar"
            />
            {/* Repetindo para preencher o grid no PC */}
            <EventCard 
              id={3}
              image={Dg.src}
              title="Pagode do Fortão" 
              price="R$ 25,00" 
              date="05 Ago"
              location="Itaúna"
            />
            <EventCard 
              id={4}
              image={Bl.src}
              title="Vans World Surf" 
              price="Grátis" 
              date="18 Out"
              location="Praia da Vila"
            />
          </div>
        </section>
      </main>
    </div>
  );
}