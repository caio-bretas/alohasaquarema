
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
import { ButtonLogin } from "./_components/ButtonLogin"
import { ProfileContent } from "./_components/ProfileContent"

export default async  function ProfilePage() {
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


  const session = await auth()




  return (
    <div className="min-h-screen bg-zinc-50 w-full overflow-x-hidden pb-32">
      
      {/* Header com Botão de Voltar */}
      <header className="px-6 py-6 flex items-center gap-4 bg-white border-b border-zinc-100">
        <Link href="/" className="p-2 hover:bg-zinc-100 rounded-xl transition-all">
          <ChevronLeft className="size-6 text-zinc-900" />
        </Link>
        <h1 className="text-xl font-black text-zinc-900 uppercase tracking-tighter italic">Perfil</h1>
      </header>
     
      
    <ProfileContent session={session as any} />

      {/* Reutilizando sua Nav de App para manter a consistência */}
  
    </div>
  )
}