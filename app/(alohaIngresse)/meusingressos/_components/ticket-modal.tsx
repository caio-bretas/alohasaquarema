import Image from "next/image";
import { X, QrCode, MapPin, Calendar, Clock, Copy } from "lucide-react";

export function TicketModal({ ticket, onClose }: { ticket: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md" onClick={onClose} />
      
      {/* Conteúdo do Ticket */}
      <div className="relative w-full max-w-sm bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Botão Fechar */}
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-white/20 backdrop-blur-md text-white rounded-full">
          <X className="size-5" />
        </button>

        {/* Imagem de Topo */}
        <div className="relative h-48 w-full">
          <img src={ticket.image} alt={ticket.title}  className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
        </div>

        {/* Informações Principais */}
        <div className="p-8 space-y-6 text-center">
          <div>
            <span className="text-[10px] font-black text-blue-600 uppercase italic tracking-widest">
              {ticket.sector}
            </span>
            <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter italic leading-none mt-1">
              {ticket.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-dashed border-zinc-200">
            <div className="text-left">
              <p className="text-[8px] font-black text-zinc-400 uppercase">Data</p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="size-3 text-blue-600" />
                <span className="text-[10px] font-bold text-zinc-900">{ticket.date}</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-[8px] font-black text-zinc-400 uppercase">Horário</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="size-3 text-blue-600" />
                <span className="text-[10px] font-bold text-zinc-900">{ticket.hour}</span>
              </div>
            </div>
          </div>

          {/* QR CODE GRANDE */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-zinc-50 shadow-inner">
              {/* Aqui você pode usar uma lib de QR Code real, por enquanto simulamos o ícone grande */}
              <QrCode className="size-40 text-zinc-900 stroke-[1.5px]" />
            </div>
            <div className="text-center">
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em]">
                Código do Ingresso
              </p>
              <p className="text-lg font-black text-zinc-900 uppercase italic">
                {ticket.qrCode}
              </p>
            </div>
          </div>
          
          <button 
            className="w-full py-4 bg-zinc-900 text-white rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            onClick={() => { /* Lógica de salvar imagem */ }}
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Salvar na Galeria</span>
          </button>
        </div>

        {/* Detalhes de recorte lateral do ticket no modal */}
        <div className="absolute bottom-[320px] -left-4 size-8 bg-zinc-900/60 rounded-full" />
        <div className="absolute bottom-[320px] -right-4 size-8 bg-zinc-900/60 rounded-full" />
      </div>
    </div>
  );
}