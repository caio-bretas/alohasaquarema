"use client";

import { MoreVertical, Calendar, MapPin, Users, DollarSign, Edit3, ExternalLink, BarChart2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface EventProps {
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
    sold: number;
    total: number;
    revenue: number;
    status: "active" | "draft" | "finished";
    image?: string;
  };
}

export function EventCard({ event }: EventProps) {
  const progress = (event.sold / event.total) * 100;

  return (
    <div className="group bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:border-blue-300 transition-all hover:shadow-xl hover:shadow-zinc-200/50">
      <div className="flex flex-col md:flex-row p-5 gap-6">
        
        {/* BANNER / STATUS */}
        <div className="relative w-full md:w-48 h-32 bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-100 shrink-0">
          {event.image ? (
            <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase text-zinc-400">Sem Imagem</div>
          )}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
              event.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
              event.status === 'draft' ? 'bg-zinc-100 text-zinc-500 border-zinc-200' : 
              'bg-red-50 text-red-600 border-red-100'
            }`}>
              {event.status === 'active' ? '● No Ar' : event.status === 'draft' ? 'Rascunho' : 'Encerrado'}
            </span>
          </div>
        </div>

        {/* INFO PRINCIPAL */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-base font-black text-zinc-900 uppercase italic tracking-tighter leading-none">
                {event.name}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1 hover:bg-zinc-100 rounded-lg transition-colors outline-none">
                  <MoreVertical className="size-4 text-zinc-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl border-zinc-200">
                  <DropdownMenuItem className="gap-2 text-xs font-bold uppercase italic"><Edit3 className="size-3" /> Editar Evento</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-xs font-bold uppercase italic"><BarChart2 className="size-3" /> Ver Relatório</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-xs font-bold uppercase italic text-blue-600"><ExternalLink className="size-3" /> Ver Página</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <Calendar className="size-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500">
                <MapPin className="size-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{event.location}</span>
              </div>
            </div>
          </div>

          {/* MÉTRICAS RÁPIDAS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-zinc-50 pt-4">
            <div>
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Vendas</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-zinc-900">{event.sold}/{event.total}</span>
                <span className="text-[9px] font-bold text-zinc-400">{Math.round(progress)}%</span>
              </div>
            </div>
            <div>
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Receita</p>
              <p className="text-xs font-black text-zinc-900 italic">R$ {event.revenue.toLocaleString()}</p>
            </div>
            <div className="col-span-2 flex items-end pb-1">
               <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-1000" 
                    style={{ width: `${progress}%` }} 
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}