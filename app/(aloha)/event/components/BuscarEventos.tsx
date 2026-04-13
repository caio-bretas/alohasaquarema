import { Search, SlidersHorizontal } from "lucide-react";

export function BuscarEventos() {
  return (
    <div className="flex items-center justify-center w-full py-2 md:py-6">
      {/* Container principal com largura controlada no PC */}
      <div className="flex items-center gap-3 w-full max-w-[800px]">
        
        <div className="relative flex-1 group">
          {/* Ícone de Busca: Fica azul no foco para dar feedback visual */}
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400 group-focus-within:text-blue-600 group-focus-within:scale-110 transition-all duration-300" />
          
          <input 
            type="text" 
            placeholder="O que vamos fazer hoje em Saquarema?" 
            className="
              w-full bg-zinc-50 border border-zinc-100 
              rounded-[1.2rem] md:rounded-[1.5rem] 
              py-4 md:py-5 pl-12 pr-4 
              text-sm md:text-base font-bold 
              placeholder:text-zinc-400 
              focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:bg-white focus:border-blue-600/30
              transition-all italic shadow-sm
            "
          />
          
          {/* Atalho de teclado opcional apenas para PC (KBD) */}
          <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 bg-zinc-200/50 rounded-md border border-zinc-300/50">
            <span className="text-[10px] font-black text-zinc-500 uppercase">Procurar</span>
          </div>
        </div>

        {/* Botão de Filtros: Mais imponente no PC */}
        <button className="
          p-4 md:p-5 
          bg-zinc-900 text-white 
          rounded-[1.2rem] md:rounded-[1.5rem] 
          shadow-lg shadow-zinc-900/20 
          hover:bg-blue-600 hover:shadow-blue-600/30
          active:scale-95 md:hover:-translate-y-1
          transition-all duration-300
          flex items-center gap-2
        ">
          <SlidersHorizontal className="size-5 md:size-6" />
          <span className="hidden md:inline text-xs font-black uppercase tracking-widest pl-1">
            Filtros
          </span>
        </button>
      </div>
    </div>
  );
}