"use client";

import { Home, Search, Heart, User } from "lucide-react";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t flex items-center justify-around z-50">
      
      <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Home size={22} />
        <span className="text-xs">Home</span>
      </button>

      <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Search size={22} />
        <span className="text-xs">Buscar</span>
      </button>

      <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Heart size={22} />
        <span className="text-xs">Favoritos</span>
      </button>

      <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <User size={22} />
        <span className="text-xs">Perfil</span>
      </button>

    </div>
  );
}