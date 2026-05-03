"use client"

import { useMemo, useState } from "react"
import {
  Search,
  X,
  SlidersHorizontal,
  History,
} from "lucide-react"
import { SearchResultCard } from "./search-result-card"




type EventType = {
  id: string
  title: string
  address: string
  coverImageUrl: string | null
  category: string
}

interface BuscaPageProps {
  events: EventType[]
}

export default function BuscaPage({
  events,
}: BuscaPageProps) {

console.log("events", events)
  const [busca, setBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] =
    useState("Tudo")

  const categorias = [
    "Tudo",
    "PAGODE",
    "SAMBA",
    "FORRO",
    "ELETRONICO",
    "ROCK",
    "AXE",
    "SERTANEJO",
  ]

  const sugestoes = [
    "Pagode",
    "Samba",
    "Saquarema",
  ]

  const resultadosFiltrados = useMemo(() => {

    return events.filter((item) => {

      const matchesBusca =
        item.title
          .toLowerCase()
          .includes(busca.toLowerCase())

      const matchesCategoria =
        categoriaAtiva === "Tudo" ||
        item.category === categoriaAtiva

      return matchesBusca && matchesCategoria
    })

  }, [events, busca, categoriaAtiva])

  return (
    <div className="flex flex-col min-h-screen bg-white w-full overflow-x-hidden pb-24">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md w-full border-b border-zinc-100 px-4 py-4">

        <div className="flex items-center gap-2 w-full">

          <div className="relative flex-1 min-w-0">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />

            <input
              type="text"
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
              placeholder="O que você procura?"
              className="w-full bg-zinc-100 border-none rounded-xl py-3 pl-10 pr-10 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />

            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-zinc-200 rounded-full active:scale-90"
              >
                <X className="size-3 text-zinc-500" />
              </button>
            )}

          </div>

          <button className="p-3 bg-zinc-900 text-white rounded-xl shrink-0 active:scale-90 transition-transform">
            <SlidersHorizontal className="size-5" />
          </button>

        </div>

        {/* FILTROS */}
        <div className="flex gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar w-full">

          {categorias.map((filter) => (
            <button
              key={filter}
              onClick={() =>
                setCategoriaAtiva(filter)
              }
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase whitespace-nowrap transition-all ${
                categoriaAtiva === filter
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-zinc-100 text-zinc-500"
              }`}
            >
              {filter}
            </button>
          ))}

        </div>

      </header>

      <main className="flex-1 px-4 py-6 space-y-6 w-full">

        {/* SUGESTÕES */}
        {!busca && (
          <section className="w-full overflow-hidden animate-in fade-in duration-500">

            <div className="flex items-center gap-2 text-zinc-400 mb-3">

              <History className="size-4" />

              <h2 className="text-[10px] font-black uppercase tracking-widest">
                Sugestões
              </h2>

            </div>

            <div className="flex flex-wrap gap-2 w-full">

              {sugestoes.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setBusca(tag)}
                  className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-xl text-xs text-zinc-600 whitespace-nowrap active:bg-blue-50"
                >
                  {tag}
                </button>
              ))}

            </div>

          </section>
        )}

        {/* RESULTADOS */}
        <section className="space-y-4 w-full">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-black text-zinc-900 tracking-tight">

              {busca
                ? "Resultados encontrados"
                : "Recomendados"}

            </h2>

            <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded-md">

              {resultadosFiltrados.length}

            </span>

          </div>

          <div className="flex flex-col gap-3 w-full">

            {resultadosFiltrados.length > 0 ? (

              resultadosFiltrados.map((item) => (

                <SearchResultCard
                  key={item.id}
                  item={{
                    id: item.id,
                    title: item.title,
                    address: item.address,
                    coverImageUrl: item.coverImageUrl || "/benner.png",
                 
                    category: item.category,
                    rating: "4.9",
                  }}
                />

              ))

            ) : (

              <div className="py-12 text-center flex flex-col items-center">

                <p className="text-zinc-400 text-sm italic">
                  Nenhum resultado para "{busca}"
                </p>

              </div>

            )}

          </div>

        </section>

      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  )
}