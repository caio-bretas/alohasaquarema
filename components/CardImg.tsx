import Image from "next/image";
import itauna from "@/public/voo.jpg";
import { MapPin, Star } from "lucide-react";

export function CardImg() {
  const locais = [
    {
      id: 1,
      title: "Voo Livre",
      location: "Sampaio Corrêa, RJ",
      image: itauna,
      rating: "4.9"
    },
    {
      id: 2,
      title: "Igreja de N. Sra.",
      location: "Vila, Saquarema",
      image: itauna, // Use a imagem correspondente aqui
      rating: "4.8"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {locais.map((local) => (
        <div 
          key={local.id} 
          className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-zinc-100 shadow-sm active:scale-95 transition-all"
        >
          {/* Container da Imagem */}
          <div className="relative h-32 w-full overflow-hidden">
            <Image
              src={local.image}
              alt={local.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Badge de Avaliação (Opcional, mas dá um ar premium) */}
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] font-bold text-zinc-800">{local.rating}</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-3 flex flex-col gap-1">
            <h3 className="font-bold text-zinc-900 text-sm leading-tight truncate">
              {local.title}
            </h3>
            
            <div className="flex items-start gap-1">
              <MapPin className="size-3 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-[11px] text-zinc-500 leading-tight line-clamp-1">
                {local.location}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}