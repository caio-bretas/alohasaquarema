import { Bell, LayoutGrid, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Seus componentes já criados
import { BuscarCity } from "@/components/BuscarCity";
import { Categorias } from "@/components/Categorias";
import { CardImg } from "@/components/CardImg";

// Assets
import banner from "@/public/benner.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-32 overflow-x-hidden">
      
      {/* HEADER: Identidade Visual Clean */}
      <header className="flex items-center justify-between px-6 py-8 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <button className="p-3 bg-zinc-50 border border-zinc-100 rounded-[1.2rem] active:scale-90 transition-all shadow-sm">
          <LayoutGrid className="size-5 text-zinc-900" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[8px] uppercase font-black tracking-[0.2em] text-zinc-400 mb-0.5">Localização</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-full border border-blue-100/50">
            <MapPin className="size-3.5 text-blue-600 fill-blue-600/10" /> 
            <span className="text-xs font-black text-blue-700 uppercase tracking-tighter">Saquarema, RJ</span>
          </div>
        </div>

        <button className="p-3 bg-zinc-50 border border-zinc-100 rounded-[1.2rem] active:scale-90 transition-all shadow-sm relative">
          <Bell className="size-5 text-zinc-900" />
          <span className="absolute top-3 right-3 size-2.5 bg-red-500 rounded-full border-[3px] border-white animate-pulse"></span>
        </button>
      </header>

      <main className="px-6 space-y-10">
        
        {/* BUSCA: Centralizada */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
           <BuscarCity />
        </section>

        {/* BANNER DE DESTAQUE: Estilo Card Flutuante */}
        <section className="relative w-full h-52 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 group">
          <Image
            src={banner}
            alt="Banner Saquarema"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
            priority
          />
          {/* Overlay de Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 mb-2">
               <span className="size-1.5 bg-blue-500 rounded-full animate-ping" />
               <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Destaque da semana</span>
            </div>
            <h2 className="text-white text-2xl font-black uppercase tracking-tighter leading-none italic">
              Explore o melhor <br /> do Surf Mundial
            </h2>
          </div>
        </section>

        {/* CATEGORIAS: Com link de navegação */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
               <h2 className="text-lg font-black text-zinc-900 uppercase tracking-tighter italic">Categorias</h2>
               <div className="h-1 w-6 bg-blue-600 rounded-full mt-1" />
            </div>
            <Link href="/categorias" className="flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-2 rounded-xl">
              Ver todas <ChevronRight className="size-3" />
            </Link>
          </div>
          <Categorias />
        </section>

        {/* FEED PRINCIPAL: Aqui entram os dados do Banco */}
        <section className="pb-10">
          <div className="mb-6">
            <h2 className="text-lg font-black text-zinc-900 uppercase tracking-tighter italic">Recomendados</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Baseado na sua localização</p>
          </div>
          
          {/* O componente CardImg agora deve estar preparado para receber lista de objetos via Props */}
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            <CardImg />
          </div>
        </section>
      </main>
    </div>
  );
}