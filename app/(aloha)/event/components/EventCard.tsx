import { MapPin, Calendar, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  id: number | string;
  title: string;
  price: string;
  date: string;
  location: string;
  image?: string;
}

export function EventCard({ id, title, price, date, location, image }: EventCardProps) {
  return (
    <div className="group relative bg-white border border-zinc-100 rounded-[2rem] p-4 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
      <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden">
        <Image
          src={image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=500"}
          alt={title}
        fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Badge de Preço */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
          <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">
            {price === "0" || price === "Grátis" ? "FREE" : price}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-3 px-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tighter leading-tight italic">
              {title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-zinc-400">
              <MapPin className="size-3 text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-tight">{location}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center bg-zinc-50 px-3 py-1.5 rounded-2xl border border-zinc-100">
             <span className="text-[8px] font-black text-zinc-400 uppercase leading-none">JUN</span>
             <span className="text-sm font-black text-zinc-900">22</span>
          </div>
        </div>
<Link href={`/eventos/${id}`} className="w-full">
        <button className="w-full py-3.5 bg-zinc-900 text-white rounded-[1.2rem] text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-colors">
          <Ticket className="size-3.5" />
          Garantir Ingresso
        </button>
        </Link>
      </div>
    </div>
  );
}