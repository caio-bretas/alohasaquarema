"use client";

import { Home, Search, Heart, User, Ticket } from "lucide-react";
import Link from "next/link";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t flex items-center justify-around z-50">
      
      <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Home size={22} />
        <span className="text-xs">Home</span>
      </Link>
       <Link href="/eventos" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Ticket size={22} />
        <span className="text-xs">Eventos</span>
      </Link>


      <Link href="/busca" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Search size={22} />
        <span className="text-xs">Buscar</span>
      </Link>

      <Link href="/meusingressos" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Ticket size={22} />
        <span className="text-xs">Meus Ingressos</span>
      </Link>

      <Link href="/profile" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <User size={22} />
        <span className="text-xs">Perfi</span>
      </Link>

    </div>
  );
}