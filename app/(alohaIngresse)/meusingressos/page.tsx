import Link from "next/link"
import { Ticket, Sparkles } from "lucide-react"

import { getUserTicketsAction } from "../actions/getUserTicketsAction"
import TicketsPage from "./_components/ticketsPage"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {

  const session = await auth()
  if(!session?.user?.id) {
   
    return  redirect("/profile")
  
  }
  const id = session?.user?.id
  const { tickets } =
    await getUserTicketsAction(id!)

  if (!tickets.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-zinc-100 flex items-center justify-center px-6">

        <div className="max-w-md w-full bg-white border border-zinc-100 rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 text-center">

          <div className="mx-auto size-28 rounded-[2.5rem] bg-blue-50 flex items-center justify-center mb-8 relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-60" />

            <Ticket className="size-14 text-blue-600 relative z-10" />

          </div>

          <div className="flex items-center justify-center gap-2 mb-3">

            <Sparkles className="size-5 text-blue-500" />

            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
              Seus eventos
            </span>

          </div>

          <h1 className="text-3xl font-black text-zinc-900 uppercase italic tracking-tight leading-none">
            Nenhum ingresso encontrado
          </h1>

          <p className="mt-5 text-sm text-zinc-500 leading-relaxed font-medium">
            Você ainda não comprou nenhum ingresso.
            Explore os próximos eventos e garanta sua entrada.
          </p>

          <Link
            href="/eventos"
            className="mt-8 h-14 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 transition-all text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center"
          >
            Explorar eventos
          </Link>

        </div>

      </div>
    )
  }

  return (
    <TicketsPage tickets={tickets} />
  )
}