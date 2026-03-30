import Image from "next/image"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"

interface ResultProps {
  item: {
    id: number | string;
    title: string;
    location: string;
    image: string;
    category: string;
    rating: string;
  }
}

export function SearchResultCard({ item }: ResultProps) {
  return (
    <Link href={`/eventos/${item.id}`} className="w-full block">
      <div className="flex items-center gap-3 p-2 bg-white border border-zinc-100 rounded-2xl w-full active:scale-[0.98] transition-all">
        <div className="relative size-16 sm:size-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[8px] font-black text-blue-600 uppercase truncate">{item.category}</span>
            <div className="flex items-center gap-0.5 shrink-0">
              <Star className="size-2.5 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] font-bold text-zinc-500">{item.rating}</span>
            </div>
          </div>
          <h3 className="font-bold text-zinc-900 text-sm truncate uppercase">{item.title}</h3>
          <div className="flex items-center gap-1 mt-1 text-zinc-400">
            <MapPin className="size-3 text-blue-500 shrink-0" />
            <span className="text-[10px] font-medium truncate italic">{item.location}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}