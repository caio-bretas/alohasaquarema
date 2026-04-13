export function SalesCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest italic">Performance de Vendas</h3>
          <select className="w-full sm:w-auto text-[10px] font-black uppercase bg-zinc-50 border border-zinc-100 outline-none p-2 rounded-xl">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
          </select>
        </div>
        
        <div className="h-56 md:h-64 w-full bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200 flex items-center justify-center relative overflow-hidden px-2">
          <div className="absolute inset-x-2 bottom-4 flex items-end justify-between h-40">
             {[30, 60, 40, 90, 50, 75, 55].map((h, i) => (
               <div key={i} className="flex-1 mx-0.5 md:mx-1 bg-blue-600/20 rounded-t-lg border-t-2 border-blue-600 relative group" style={{ height: `${h}%` }}>
                 {/* Tooltip simulado no hover */}
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                   R${h}k
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-5 md:p-6 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest italic mb-8">Vendas por Lote</h3>
        <div className="space-y-5 md:space-y-6">
          {[
            { label: "1º Lote Pista", value: 100, color: "bg-blue-600" },
            { label: "Área VIP", value: 65, color: "bg-purple-600" },
            { label: "2º Lote Pista", value: 12, color: "bg-blue-400" },
          ].map((lote) => (
            <div key={lote.label}>
              <div className="flex justify-between text-[9px] md:text-[10px] font-black uppercase mb-2">
                <span className="text-zinc-500">{lote.label}</span>
                <span className="text-zinc-900">{lote.value}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div className={`h-full ${lote.color} transition-all duration-1000`} style={{ width: `${lote.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}