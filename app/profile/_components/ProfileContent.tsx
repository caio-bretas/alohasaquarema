

import {signIn } from "next-auth/react"
import { 
  User, 
  Settings, 
  Bell, 
  Lock, 
  LogOut, 
  ChevronRight, 
  Camera, 
  CreditCard, 
  ShieldCheck,
  CircleHelp,
  ChevronLeft
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ButtonLogin } from "./ButtonLogin";
import { ButtonSair } from "./ButtonSair";

export async function ProfileContent() {
  const session = await  auth();
  const userdata = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image
  }
      const sections = [
    {
      title: "Conta",
      items: [
        { icon: User, label: "Informações Pessoais", color: "text-blue-500", bg: "bg-blue-50" },
        { icon: Lock, label: "Segurança e Senha", color: "text-emerald-500", bg: "bg-emerald-50" },
        { icon: CreditCard, label: "Métodos de Pagamento", color: "text-orange-500", bg: "bg-orange-50" },
      ]
    },
    {
      title: "Preferências",
      items: [
        { icon: Bell, label: "Notificações", color: "text-purple-500", bg: "bg-purple-50" },
        { icon: ShieldCheck, label: "Privacidade", color: "text-indigo-500", bg: "bg-indigo-50" },
        { icon: Settings, label: "Configurações do App", color: "text-zinc-500", bg: "bg-zinc-50" },
      ]
    },
    {
      title: "Suporte",
      items: [
        { icon: CircleHelp, label: "Central de Ajuda", color: "text-pink-500", bg: "bg-pink-50" },
      ]
    }
  ]

    return (
         <main className="px-4 py-8 space-y-8">
        
     {!session ? (
     
      <ButtonLogin />     

  


     ): (
 <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="size-28 rounded-[2.5rem] bg-zinc-200 overflow-hidden border-4 border-zinc-800 shadow-xl">
             <img src={userdata.image || "/default.png"} alt="" />
              <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-purple-600" />
            </div>
            <button className="absolute bottom-0 right-0 p-2.5 bg-zinc-900 text-white rounded-2xl border-4 border-white shadow-lg active:scale-90 transition-all">
              <Camera className="size-4" />
            </button>
          </div>
          
          <div>
            <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">{userdata.name}</h2>
            <p className="text-sm text-zinc-400 font-medium">{userdata.email}</p>
          </div>

          <button className="bg-white border border-zinc-200 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 shadow-sm active:bg-zinc-50">
            Editar Perfil
          </button>
   
        </section>

     )}

     {session ?(

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h3 className="px-2 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                {section.title}
              </h3>
              
              <div className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm">
                {section.items.map((item, index) => (
                  <button 
                    key={item.label}
                    className={`w-full flex items-center justify-between p-5 active:bg-zinc-50 transition-all ${
                      index !== section.items.length - 1 ? "border-b border-zinc-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${item.bg}`}>
                        <item.icon className={`size-5 ${item.color}`} />
                      </div>
                      <span className="text-sm font-bold text-zinc-700">{item.label}</span>
                    </div>
                    <ChevronRight className="size-4 text-zinc-300" />
                  </button>
                ))}
              </div>
            </section>
          ))}
              <ButtonSair />
        </div>
        
     ): (
        <></>
     )}
       

        {/* Botão Logout */}
   

        <p className="text-center text-[10px] text-zinc-300 font-medium mt-8 italic">
          Versão 2.4.0 • Saquarema Explore
        </p>


        
      </main>
    )
}