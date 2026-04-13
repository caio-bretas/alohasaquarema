import { DollarSign, Ticket, Users, TrendingUp } from "lucide-react";

const stats = [
  { label: "Receita Bruta", value: "R$ 42.850,00", grow: "+12.5%", icon: DollarSign },
  { label: "Ingressos Vendidos", value: "1.240", grow: "+8%", icon: Ticket },
  { label: "Check-ins Realizados", value: "856", grow: "+5.2%", icon: Users },
  { label: "Visualizações", value: "12.4k", grow: "+18%", icon: TrendingUp },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-3">
            <div className="size-9 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center">
              <stat.icon className="size-4 text-zinc-900" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              {stat.grow}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-zinc-900 italic tracking-tighter">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}