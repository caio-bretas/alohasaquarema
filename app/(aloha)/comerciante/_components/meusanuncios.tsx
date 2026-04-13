import { Plus, MoreHorizontal, Edit3, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MeusAnuncios() {
  const anuncios = [
    {
      id: 1,
      titulo: "Tênis Esportivo Ultra Light",
      preco: "R$ 299,90",
      status: "Ativo",
      imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
      vendas: 12,
    },
    {
      id: 2,
      titulo: "Relógio Inteligente Pro v2",
      preco: "R$ 450,00",
      status: "Pausado",
      imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      vendas: 5,
    },
  ];

  return (
    <section className="space-y-4">
      {/* Header da Seção */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Meus Anúncios</h2>
          <p className="text-sm text-zinc-500">Gerencie seus produtos listados</p>
        </div>
        
        <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg px-4 shadow-sm transition-all active:scale-95">
          <Plus className="mr-2 size-4" />
          Criar Anúncio
        </Button>
      </div>

      {/* Lista de Anúncios */}
      <div className="grid gap-3">
        {anuncios.map((item) => (
          <div 
            key={item.id} 
            className="group flex items-center justify-between p-3 bg-white border border-zinc-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Thumbnail */}
              <div className="size-16 rounded-lg overflow-hidden border border-zinc-100 bg-zinc-50 flex-shrink-0">
                <img src={item.imagem} alt={item.titulo} className="size-full object-cover group-hover:scale-110 transition-transform" />
              </div>

              {/* Infos */}
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-zinc-800 text-sm md:text-base leading-tight">
                  {item.titulo}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-900 font-bold">{item.preco}</span>
                  <span className="text-zinc-400 text-xs">•</span>
                  <span className="text-zinc-500 text-xs">{item.vendas} vendas</span>
                </div>
              </div>
            </div>

            {/* Ações e Status */}
            <div className="flex items-center gap-4">
              <Badge 
                variant="outline" 
                className={`hidden sm:flex rounded-full px-3 ${
                  item.status === "Ativo" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : "bg-zinc-50 text-zinc-500 border-zinc-200"
                }`}
              >
                {item.status}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-zinc-500">
                    <MoreHorizontal className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Edit3 className="size-4" /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <ExternalLink className="size-4" /> Ver na Loja
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                    <Trash2 className="size-4" /> Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Estado Vazio (Opcional - caso não existam anúncios) */}
      {anuncios.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
           <div className="bg-zinc-200 p-4 rounded-full mb-4">
              <Plus className="size-8 text-zinc-400" />
           </div>
           <p className="text-zinc-500 font-medium">Nenhum anúncio criado ainda.</p>
           <Button variant="link" className="text-purple-600">Começar a vender</Button>
        </div>
      )}
    </section>
  );
}