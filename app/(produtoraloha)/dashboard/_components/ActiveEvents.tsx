export function ActiveEvents() {
  const events = [
    { name: "Samba do Amor - Tá Na Mente", date: "18 Abr", status: "Vendas Abertas", sales: 75, revenue: "R$ 12k" },
    { name: "Sunset Saquarema 2026", date: "10 Mai", status: "Esgotando", sales: 92, revenue: "R$ 45k" },
    { name: "Pagode do Fortão", date: "02 Jun", status: "Aguardando", sales: 0, revenue: "R$ 0" },
  ];

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase italic tracking-tight text-zinc-900">Seus Eventos Ativos</h2>
        <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all">Ver Todos</button>
      </div>
      <div className="divide-y divide-zinc-50">
        {events.map((event) => (
          <div key={event.name} className="p-5 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-zinc-100 rounded-2xl border border-zinc-200 flex items-center justify-center font-black text-zinc-400 text-xs">IMG</div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">{event.name}</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{event.date} • GOOD BAR SAQUAREMA</p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="hidden md:block text-right">
                <p className="text-xs font-black text-zinc-900 uppercase italic">{event.sales}%</p>
                <div className="w-24 h-1.5 bg-zinc-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${event.sales}%` }} />
                </div>
              </div>
              <div className="text-right min-w-20">
                <p className="text-sm font-black text-zinc-900 italic">{event.revenue}</p>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{event.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}