"use client";

import dynamic from "next/dynamic";

// Carrega o componente do mapa apenas no cliente
const MapComponent = dynamic(() => import("@/components/MapPage"), {
  ssr: false, // O segredo para evitar "window is not defined"
  loading: () => (
    <div className="w-full h-screen bg-[#09090b] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-medium animate-pulse">Iniciando GPS...</p>
      </div>
    </div>
  ),
});

export default function MapaPage() {
  return <MapComponent />;
}