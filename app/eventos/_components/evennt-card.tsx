import Image from "next/image"
import Link from "next/link"
import { Timer, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  item: {
    id: number | string;
    title: string;
    description: string;
    data: string;
    horas: string;
    image: string;
    location: string;
  }
}

export function EventCard({ item }: EventCardProps) {
  return (
    <div className="group bg-white border border-zinc-100 rounded-[2rem] overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col h-full">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
            {item.data}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-lg font-black text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
          {item.title}
        </h2>
        
        <p className="text-zinc-500 text-xs leading-relaxed mb-6 line-clamp-2 font-medium">
          {item.description}
        </p>

        <div className="space-y-2 mb-6 mt-auto">
          <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-bold uppercase">
            <Timer className="size-3.5 text-blue-500" />
            <span>{item.horas}h</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-bold uppercase">
            <MapPin className="size-3.5 text-blue-500" />
            <span className="truncate">{item.location}</span>
          </div>
        </div>

        <Link href={`/eventos/${item.id}`} className="w-full">
          <Button 
            variant="outline" 
            className="w-full justify-between rounded-xl border-zinc-100 hover:bg-blue-600 hover:text-white transition-all h-11 text-[10px] font-black uppercase tracking-widest"
          >
            Ver detalhes
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}