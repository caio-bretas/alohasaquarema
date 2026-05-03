import { redirect } from "next/navigation"



import { Plus } from "lucide-react"

import { StatsGrid } from "./_components/StatsGrid"
import { ActiveEvents } from "./_components/ActiveEvents"

import Link from "next/link"
import { auth } from "@/lib/auth"
import { getDashboardDataAction } from "../actions/getDashboardDataAction"

export default async function DashboardPage() {

  const session = await auth()
  const userRole = session?.user ? (session.user as { role?: string })?.role : undefined
  console.log("session:", session)
  if (
    !session?.user ||
    (
      userRole !== "ADMIN" &&
      userRole !== "PRODUCER"
    )
  ) {

    redirect("/")
  }

  const data = await getDashboardDataAction()

  return (

    <div className="space-y-8 max-w-7xl mx-auto">

      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">

        <div>

          <h1 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase italic leading-none">

            Dashboard
            <span className="text-blue-600">.</span>

          </h1>

          <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-2">

            Bem-vindo de volta,
            <span className="text-zinc-900">
              {" "}
              {session.user.name}
            </span>

          </p>

        </div>

        <Link
          href="/dashboard/eventos/create"
          className="bg-zinc-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 group"
        >

          <Plus className="size-4 text-blue-400 group-hover:rotate-90 transition-transform" />

          <span className="text-xs font-black uppercase tracking-widest">

            Criar Novo Evento

          </span>

        </Link>

      </section>

      <StatsGrid stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <ActiveEvents />

        </div>

      </div>

    </div>
  )
}