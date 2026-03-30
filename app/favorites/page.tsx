"use client"
import { useState } from "react"
import { ChevronLeft, Search, Heart } from "lucide-react"
import Link from "next/link"
import { FavoriteCard } from "./_components/favorite-card"

export default function FavoritesPage() {
  // Estado que será preenchido pelo seu banco de dados futuramente
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      title: 'Voo Livre Saquarema',
      location: 'Sampaio Corrêa',
      image: '/voo.jpg',
      rating: '4.9',
      category: 'Aventura'
    },
    {
      id: 2,
      title: 'Surf Festival',
      location: 'Praia de Itaúna',
      image: '/surf.jpg',
      rating: '4.8',
      category: 'Evento'
    }
  ])

  // Função preparada para deletar no Banco de Dados
  const handleRemove = async (id: number | string) => {
    // 1. Aqui você faria: await supabase.from('favorites').delete().eq('id', id)
    
    // 2. Atualiza a interface localmente (Fica instantâneo para o usuário)
    setFavoritos(prev => prev.filter(item => item.id !== id))
    
    console.log(`Item ${id} removido dos favoritos`)
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 w-full overflow-x-hidden pb-32">
      
      {/* Header Fixo */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 py-5 flex items-center justify-between">
        <Link href="/" className="p-2 bg-zinc-100 rounded-xl active:scale-90 transition-all">
          <ChevronLeft className="size-5 text-zinc-600" />
        </Link>
        <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900">Meus Favoritos</h1>
        <Link href="/busca" className="p-2 text-zinc-400">
          <Search className="size-5" />
        </Link>
      </header>

      <main className="px-4 py-6">
        {favoritos.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {favoritos.map((item) => (
              <FavoriteCard 
                key={item.id} 
                item={item} 
                onRemove={handleRemove} 
              />
            ))}
          </div>
        ) : (
          /* Empty State (Estado Vazio) */
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-5">
            <div className="size-20 bg-white rounded-[2rem] flex items-center justify-center shadow-sm border border-zinc-100">
              <Heart className="size-8 text-zinc-200" />
            </div>
            <div className="px-10">
              <h2 className="font-black text-zinc-900 uppercase tracking-widest text-xs">Lista Vazia</h2>
              <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed font-medium uppercase">
                Você ainda não salvou nada. Explore a cidade e clique no coração!
              </p>
            </div>
            <Link href="/busca">
              <button className="bg-blue-600 text-white px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase shadow-lg shadow-blue-200 active:scale-95 transition-all">
                Começar a buscar
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}