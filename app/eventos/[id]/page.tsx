import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Timer, ChevronLeft, Share2, Info, Ticket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function EventoDetalhes({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Aqui você faria: const evento = await db.eventos.findUnique({ where: { id } })
  const eventosDb = [
    {
      id: 1,
      title: 'Nosso Nome e Pagode',
      description: 'Prepare-se para a melhor roda de samba de Saquarema! Noite de samba com as melhores atrações locais.',
      data: '20 Jun',
      horas: '20:00',
      image: '/benner.png',
      location: 'Saquarema, RJ',
      organizer: 'Pagode do Samba Oficial'
    }
  ];

  const evento = eventosDb.find(e => e.id === Number(id));
  if (!evento) return notFound();

  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto relative overflow-x-hidden pb-40">
      
      {/* Seção Hero */}
      <div className="relative h-[45vh] w-full">
        <Image src={evento.image} alt={evento.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
          <Link href="/eventos" className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
            <ChevronLeft className="size-6" />
          </Link>
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
            <Share2 className="size-5" />
          </button>
        </div>

        <div className="absolute bottom-12 left-8 right-8 z-10">
          <h1 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter">
            {evento.title}
          </h1>
        </div>
      </div>

      {/* Conteúdo */}
      <main className="px-6 -mt-10 relative bg-white rounded-t-[3rem] pt-10 space-y-8">
        
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-zinc-50 rounded-[2rem] border border-zinc-100">
            <CalendarDays className="size-5 text-blue-600 mb-2" />
            <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">Data</p>
            <p className="text-xs font-black text-zinc-900 mt-1">{evento.data}</p>
          </div>
          <div className="p-4 bg-zinc-50 rounded-[2rem] border border-zinc-100">
            <Timer className="size-5 text-blue-600 mb-2" />
            <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">Horário</p>
            <p className="text-xs font-black text-zinc-900 mt-1">{evento.horas}h</p>
          </div>
        </div>

        {/* Localização com Estilo App */}
        <div className="flex items-center justify-between p-5 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
              <MapPin className="size-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Local</p>
              <p className="text-xs font-bold text-zinc-900 truncate">{evento.location}</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl text-[9px] font-black text-blue-600 bg-blue-50 uppercase tracking-widest">Mapa</button>
        </div>

        {/* Descrição */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
             <div className="h-1 w-6 bg-blue-600 rounded-full" />
             <h2 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em]">Sobre o evento</h2>
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed font-medium">
            {evento.description}
          </p>
        </div>

        {/* Organizador */}
        <div className="flex items-center gap-4 p-5 bg-zinc-900 rounded-[2.5rem] text-white">
          <div className="size-10 bg-white/10 rounded-xl flex items-center justify-center text-xs font-black italic border border-white/10">SQ</div>
          <div className="flex flex-col">
            <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Organização</span>
            <span className="text-xs font-bold">{evento.organizer}</span>
          </div>
        </div>
        
      </main>

      {/* Botão de Reserva Fixo */}
    
    </div>
  )
}