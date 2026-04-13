import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Star } from "lucide-react"

interface FavoriteCardProps {
  item: {
    id: number | string;
    title: string;
    location: string;
    image: string;
    category: string;
    rating: string;
  };
  onRemove: (id: number | string) => void;
}

export function FavoriteCard({ item, onRemove }: FavoriteCardProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-zinc-100 shadow-sm active:scale-[0.98] transition-all h-full">
      {/* Imagem com Badge */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg z-10">
          <span className="text-[8px] font-black text-blue-600 uppercase tracking-tighter italic">
            {item.category}
          </span>
        </div>
        
        {/* Botão de Remover (Ação de Banco de Dados) */}
        <button 
          onClick={(e) => {
            e.preventDefault(); // Evita navegar para a página de detalhes
            onRemove(item.id);
          }}
          className="absolute top-3 right-3 p-2 bg-red-500 rounded-full text-white shadow-lg active:scale-75 transition-all z-20"
        >
          <Heart className="size-3 fill-current" />
        </button>
      </div>

      {/* Info do Card */}
      <div className="p-4 flex flex-col flex-1 gap-1.5 justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold text-zinc-400">{item.rating}</span>
          </div>
          
          <h3 className="font-bold text-zinc-900 text-[11px] leading-tight line-clamp-2 uppercase tracking-tight">
            {item.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 text-zinc-400 mt-auto">
          <MapPin className="size-3 text-blue-500 shrink-0" />
          <span className="text-[9px] font-medium truncate italic">{item.location}</span>
        </div>
      </div>

      {/* Link de fundo para detalhes */}
      <Link href={`/eventos/${item.id}`} className="absolute inset-0 z-0" />
    </div>
  )
}