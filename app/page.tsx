
import { BuscarCity } from "@/components/BuscarCity";
import { Bell, LayoutDashboard, MapPin, MapPinPen } from "lucide-react";
import Image from "next/image";
import banner from "@/public/benner.png"
import { Categorias } from "@/components/Categorias";
import { CardImg } from "@/components/CardImg";
export default function Home() {
  return (
    <div className="min-h-screen space-y-10 p-4  pt-5  px-5 flex flex-col w-full ">
       <header className="flex items-center w-full justify-between">
          <div className="size-12 flex items-center justify-center border-2 border-zinc-900 rounded-full">
            <LayoutDashboard />
          </div>

          <span className="flex items-center gap-2 text-blue-500 font-semibold"><MapPin/>Saquarema, Rj</span>
      

      <div className="size-12 flex items-center justify-center border-2 border-zinc-900 rounded-full">
        <Bell />
      </div>
      
       </header>
       <BuscarCity />
       <main className="space-y-8">
        <Image
        src={banner}
        alt="asdasd"
        className="w-full h-full rounded-2xl shadow-2xl shadow-zinc-900/20"
        />

        <div>
          <h1 className="text-">Categoria</h1>
          <Categorias />
        </div>
        <div>
          <h1>Melhores Escolhas para você</h1>
          <CardImg />
        </div>
       </main>
    </div>
  );
}
