import { Users, CheckCircle2, Clock, XCircle } from "lucide-react";

export function StatsSummary() {
  const stats = [
    { label: "Total Inscritos", value: "1,240", icon: Users, color: "text-blue-600" },
    { label: "Check-in Feito", value: "856", icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Aguardando", value: "384", icon: Clock, color: "text-amber-600" },
    { label: "Cancelados", value: "12", icon: XCircle, color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <s.icon className={`size-4 ${s.color}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{s.label}</span>
          </div>
          <p className="text-xl font-black text-zinc-900 mt-2 italic">{s.value}</p>
        </div>
      ))}
    </div>
  );
}