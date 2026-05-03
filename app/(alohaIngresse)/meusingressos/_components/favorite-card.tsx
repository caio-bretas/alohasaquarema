import Image from "next/image";
import { QrCode, Calendar, Copy } from "lucide-react";

interface TicketCardProps {
  ticket: {
    id: string;
    title: string;
    date: string;
    image: string;
    qrCode: string;
    status: string;
  };
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="relative bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-sm">
      {/* Detalhe de recorte de Ticket (estético) */}
      <div className="absolute top-1/2 -left-3 size-6 bg-zinc-50 rounded-full border border-zinc-100 z-10" />
      <div className="absolute top-1/2 -right-3 size-6 bg-zinc-50 rounded-full border border-zinc-100 z-10" />

      <div className="flex p-4 gap-4">
        {/* Imagem do Evento */}
        <div className="relative h-24 w-24 rounded-[1.5rem] overflow-hidden flex-shrink-0">
          <img
            src={ticket.image}
            alt={ticket.title}
            
            className="object-cover"
          />
        </div>

        {/* Informações */}
        <div className="flex flex-col justify-center flex-1">
          <div className="bg-blue-50 text-blue-600 w-fit px-2 py-0.5 rounded-full mb-1">
            <span className="text-[7px] font-black uppercase tracking-tighter italic">{ticket.status}</span>
          </div>
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tighter italic line-clamp-1">
            {ticket.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-zinc-400">
            <Calendar className="size-3 text-blue-500" />
            <span className="text-[9px] font-bold uppercase tracking-tight">
              {ticket.date}
            </span>
          </div>
        </div>
      </div>

      {/* Área do QR Code / Código */}
      <div className="bg-zinc-50 border-t border-dashed border-zinc-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl border border-zinc-100 shadow-sm">
            <QrCode className="size-8 text-zinc-900" />
          </div>
          <div>
            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Código do Ticket</p>
            <p className="text-[11px] font-black text-zinc-900 uppercase italic">{ticket.qrCode}</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigator.clipboard.writeText(ticket.qrCode)}
          className="p-3 bg-white border border-zinc-100 rounded-xl active:scale-90 transition-all hover:bg-zinc-900 hover:text-white group"
        >
          <Copy className="size-4" />
        </button>
      </div>
    </div>
  );
}