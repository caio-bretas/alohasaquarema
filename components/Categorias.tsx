import { Landmark, Sparkle, Volleyball } from "lucide-react";

export function Categorias(){
    return(
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* Exemplo de como categorias ficam mais bonitas que um Select fixo */}
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium shadow-lg shadow-blue-200">
            <Sparkle className="size-4" /> Top 12 praias
          </button>
          
          <button className="flex items-center gap-2 bg-zinc-100 text-zinc-600 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium hover:bg-zinc-200 transition-colors">
            <Volleyball className="size-4" /> Aventura
          </button>

          <button className="flex items-center gap-2 bg-zinc-100 text-zinc-600 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium hover:bg-zinc-200 transition-colors">
            <Landmark className="size-4" /> Cultura
          </button>
        </div>
    )
}