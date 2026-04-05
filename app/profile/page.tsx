
import { 

  ChevronLeft,
 
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import  {ButtonLogin}  from "./_components/ButtonLogin"
import { ProfileContent } from "./_components/ProfileContent"

export default async  function ProfilePage() {


const session = await auth();

if (!session?.user) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] p-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Minha Conta</h1>
        <p className="text-zinc-500 mb-8">Faça login para gerenciar seu perfil</p>
        
        <ButtonLogin />
        
        <p className="text-[12px] text-zinc-400 mt-6">
          Ao continuar, você concorda com nossos Termos de Uso.
        </p>
      </div>
    </main>
  );
}

console.log("SESSION:", session);


  return (
    <div className="min-h-screen bg-zinc-50 w-full overflow-x-hidden pb-32">
      
      {/* Header com Botão de Voltar */}
      <header className="px-6 py-6 flex items-center gap-4 bg-white border-b border-zinc-100">
        <Link href="/" className="p-2 hover:bg-zinc-100 rounded-xl transition-all">
          <ChevronLeft className="size-6 text-zinc-900" />
        </Link>
        <h1 className="text-xl font-black text-zinc-900 uppercase tracking-tighter italic">Perfil</h1>
      </header>
     <ProfileContent />
      {/* Reutilizando sua Nav de App para manter a consistência */}
  
    </div>
  )
}
