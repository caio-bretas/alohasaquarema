import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Opcional: se tiver shadcn badge
import { ArrowLeft, Bell, Settings2, Sparkles } from "lucide-react";
import { CardDashBoardC } from "./_components/CardDashBoardC";
import { MeusAnuncios } from "./_components/meusanuncios";

export default function Comerciante() {
  return (
    <div className="w-full min-h-screen pb-20 bg-zinc-50/50">
      {/* Header Superior */}
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-zinc-500 hover:bg-zinc-100">
              <ArrowLeft className="size-5" />
            </Button>
            <h1 className="text-lg font-bold text-zinc-900 tracking-tight">
              Painel do Comerciante
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative text-zinc-500 border-zinc-200">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <Button variant="outline" size="icon" className="text-zinc-500 border-zinc-200">
              <Settings2 className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Card de Perfil / Status */}
        <section className="relative overflow-hidden bg-white border border-zinc-200 rounded-xl p-5 md:p-8 shadow-sm">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar className="size-20 md:size-24 border-4 border-white shadow-xl rounded-2xl">
                  <AvatarImage className="object-cover" src="https://github.com/shadcn.png" />
                  <AvatarFallback className="rounded-2xl">CN</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-green-500 size-5 rounded-full border-4 border-white" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-zinc-900">Meu Negócio</h2>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none">
                    Free Plan
                  </Badge>
                </div>
                <p className="text-zinc-500 font-medium">comerciante@gmail.com</p>
              </div>
            </div>

            <Button className="w-full md:w-fit bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200 transition-all active:scale-95">
              <Sparkles className="mr-2 size-4" />
              Fazer Upgrade
            </Button>
          </div>

          {/* Efeito decorativo no fundo do card */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 size-32 bg-purple-50 rounded-full blur-3xl opacity-50" />
        </section>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 gap-6">
           <CardDashBoardC />
        </div>
        <MeusAnuncios />
      </main>
    </div>
  );
}