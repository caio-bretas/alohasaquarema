import { Save } from "lucide-react";
import { SettingsNav } from "./_components/SettingsNav";
import { ProfileSettings } from "./_components/SettingSections";


export default function ConfiguracoesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* HEADER FIXO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none">
            Ajustes<span className="text-blue-600">.</span>
          </h1>
          <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-2">
            Configure sua conta e preferências de produtor.
          </p>
        </div>
        
        <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Save className="size-4" />
          <span className="text-xs font-black uppercase tracking-widest">Salvar Alterações</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* NAVEGAÇÃO LATERAL */}
        <aside className="lg:col-span-3">
          <SettingsNav />
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="lg:col-span-9">
          <ProfileSettings />

          {/* DANGER ZONE */}
          <div className="mt-12 p-6 border border-red-100 bg-red-50/30 rounded-3xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Zona Crítica</h4>
            <p className="text-xs text-zinc-500 mb-4 font-medium">Ao excluir sua conta, todos os seus eventos e dados de vendas em Saquarema serão permanentemente removidos.</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:underline">Excluir minha conta de produtor</button>
          </div>
        </main>

      </div>
    </div>
  );
}