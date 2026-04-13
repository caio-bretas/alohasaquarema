import { ArrowUpRight, Target, MousePointer2, CreditCard } from "lucide-react";

const metrics = [
  { label: "Taxa de Conversão", value: "3.2%", detail: "Visitas vs Vendas", icon: Target },
  { label: "Ticket Médio", value: "R$ 145,00", detail: "Por participante", icon: CreditCard },
  { label: "Cliques no Link", value: "12.430", detail: "Origem: Instagram", icon: MousePointer2 },
];

export function ConversionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-white border border-zinc-200 p-5 rounded-3xl shadow-sm hover:border-blue-200 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="size-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100">
              <m.icon className="size-5 text-zinc-900" />
            </div>
            <ArrowUpRight className="size-4 text-emerald-500" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-none">{m.label}</p>
          <p className="text-2xl font-black text-zinc-900 italic tracking-tighter mt-1">{m.value}</p>
          <p className="text-[9px] font-bold text-zinc-500 uppercase mt-2">{m.detail}</p>
        </div>
      ))}
    </div>
  );
}