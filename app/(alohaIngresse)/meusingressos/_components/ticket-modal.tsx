import Image from "next/image";
import { X, QrCode, Calendar, Clock } from "lucide-react";

export function TicketModal({ ticket, onClose }: { ticket: any, onClose: () => void }) {
  return (
    <div className="fixed p-20 inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-md" onClick={onClose} />
      
      {/* Conteúdo do Ticket */}
      <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        
        {/* Botão Fechar - Fixado no topo para não sumir no scroll */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-30 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Área com Scroll */}
        <div className="overflow-y-auto custom-scrollbar">
          
          {/* Imagem de Topo - Altura reduzida em telas pequenas */}
          <div className="relative h-32 sm:h-48 w-full">
            <img src={ticket.image} alt={ticket.title} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
          </div>

          {/* Informações Principais */}
          <div className="p-6 sm:p-8 space-y-4 sm:space-y-6 text-center">
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase italic tracking-widest">
                {ticket.sector}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-tighter italic leading-none mt-1">
                {ticket.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-dashed border-zinc-200 relative">
               {/* Recortes do Ticket (Movidos para dentro do container relativo) */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 size-8 bg-zinc-900/80 rounded-full hidden sm:block" />
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 size-8 bg-zinc-900/80 rounded-full hidden sm:block" />
              
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

            {/* QR CODE - Escala com a tela */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-white p-4 sm:p-6 rounded-[2rem] border-2 border-zinc-50 shadow-inner">
                <QrCode className="size-24 sm:size-40 text-zinc-900 stroke-[1.5px]" />
              </div>
              <div className="text-center">
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em]">
                  Código do Ingresso
                </p>
                <p className="text-base sm:text-lg font-black text-zinc-900 uppercase italic">
                  {ticket.qrCode}
                </p>
              </div>
            </div>
            
            <button 
              className="w-full py-3 sm:py-4 bg-zinc-900 text-white rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all mb-2"
              onClick={() => {}}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Salvar na Galeria</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}