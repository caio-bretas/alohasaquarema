
import { 

  ChevronLeft,
 
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ButtonLogin } from "./_components/ButtonLogin"
import { ProfileContent } from "./_components/ProfileContent"

export default async  function ProfilePage() {



  const session = await auth()
  if(!session?.user){
    return redirect("/login")
  }
console.log("SESSION:", session)




  return (
    <div className="min-h-screen bg-zinc-50 w-full overflow-x-hidden pb-32">
      
      {/* Header com Botão de Voltar */}
      <header className="px-6 py-6 flex items-center gap-4 bg-white border-b border-zinc-100">
        <Link href="/" className="p-2 hover:bg-zinc-100 rounded-xl transition-all">
          <ChevronLeft className="size-6 text-zinc-900" />
        </Link>
        <h1 className="text-xl font-black text-zinc-900 uppercase tracking-tighter italic">Perfil</h1>
      </header>
     <h1>a</h1>
      

      {/* Reutilizando sua Nav de App para manter a consistência */}
  
    </div>
  )
}
