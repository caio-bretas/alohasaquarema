import { Music, Utensils, PartyPopper, Trophy, Theater } from "lucide-react";

const categorias = [
  { id: 1, name: "Shows", icon: Music, color: "bg-purple-50 text-purple-600" },
  { id: 2, name: "Festas", icon: PartyPopper, color: "bg-pink-50 text-pink-600" },
  { id: 3, name: "Esporte", icon: Trophy, color: "bg-orange-50 text-orange-600" },
  { id: 4, name: "Teatro", icon: Theater, color: "bg-blue-50 text-blue-600" },
  { id: 5, name: "Gastronomia", icon: Utensils, color: "bg-emerald-50 text-emerald-600" },
];


export function CategoriasEventos() {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
      {categorias.map((cat) => (
        <button 
          key={cat.id}
          className="flex flex-col items-center gap-3 min-w-[80px] group"
        >
          <div className={`size-16 ${cat.color} rounded-[1.5rem] flex items-center justify-center border border-transparent group-active:scale-90 transition-all shadow-sm group-hover:shadow-md`}>
            <cat.icon className="size-6" />
          </div>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            {cat.name}
          </span>
        </button>
      ))}
    </div>
  );
}