"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { 
  MapPin, Star, SlidersHorizontal, X, Navigation, 
  ChevronRight, Loader2, Map as MapIcon, LocateFixed 
} from "lucide-react";
import { toast } from "sonner";

// --- TIPAGEM DOS PONTOS ---
interface Place {
  id: number;
  title: string;
  category: string;
  rating: number;
  coords: [number, number];
  image: string;
  location: string;
  isBase?: boolean;
}

// --- SEUS PONTOS (ADICIONE MAIS AQUI) ---
const PLACES: Place[] = [
  { 
    id: 1, 
    title: "Praia de Itaúna", 
    category: "Praia", 
    rating: 4.8, 
    coords: [-22.933, -42.484], 
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400", 
    location: "Itaúna, Saquarema" 
  },
  { 
    id: 2, 
    title: "Lagoa de Saquarema", 
    category: "Natureza", 
    rating: 4.7, 
    coords: [-22.92, -42.51], 
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400", 
    location: "Centro, Saquarema" 
  },
  { 
    id: 999, 
    title: "Nosso Point (Base)", 
    category: "Base", 
    rating: 5.0, 
    coords: [-22.9255, -42.4920], 
    image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?w=400", 
    location: "Vila, Saquarema",
    isBase: true 
  },
];

// --- GERADOR DE ÍCONES CUSTOMIZADOS ---
const createCustomIcon = (color: string, isUser = false, isBase = false) => {
  const size = isBase ? 48 : 42;
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
        <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:${isUser ? '0.4' : '0.2'};animation:pulse-ring 2s infinite;"></div>
        <div style="width:${isUser ? '12px' : '16px'};height:${isUser ? '12px' : '16px'};border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 15px ${color}66;z-index:2;"></div>
        ${isBase ? `<div style="position:absolute;top:-5px;background:${color};color:white;font-size:8px;padding:2px 5px;border-radius:4px;font-weight:900;text-transform:uppercase;">VOCÊ</div>` : ''}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
};

export default function MapComponent() {
  const router = useRouter();
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const routingControlRef = useRef<any>(null);
  const isMapInitialized = useRef(false);

  const [selected, setSelected] = useState<Place | null>(null);
  const [category, setCategory] = useState("Todas");
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  // 1. Inicialização do Mapa
  useEffect(() => {
    if (isMapInitialized.current || !mapContainerRef.current) return;

    const init = async () => {
      await import("leaflet-routing-machine");

      if (isMapInitialized.current) return;

      const map = L.map(mapContainerRef.current!, {
        center: [-22.93, -42.49],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png").addTo(map);
      markersGroupRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      isMapInitialized.current = true;

      // Localização em tempo real
      map.locate({ watch: true, enableHighAccuracy: true });
      map.on("locationfound", (e) => {
        if (!userMarkerRef.current) {
          userMarkerRef.current = L.marker(e.latlng, { 
            icon: createCustomIcon("#10b981", true),
            zIndexOffset: 1000 
          }).addTo(map);
        } else {
          userMarkerRef.current.setLatLng(e.latlng);
        }
      });
    };

    init();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        isMapInitialized.current = false;
      }
    };
  }, []);

  // 2. Renderizar Pontos Dinâmicos
  useEffect(() => {
    if (!markersGroupRef.current || !mapRef.current) return;
    markersGroupRef.current.clearLayers();

    const filtered = category === "Todas" ? PLACES : PLACES.filter(p => p.category === category);

    filtered.forEach((p) => {
      const color = p.isBase ? "#ef4444" : "#3b82f6";
      const marker = L.marker(p.coords, { 
        icon: createCustomIcon(color, false, p.isBase),
        zIndexOffset: p.isBase ? 500 : 0
      })
      .on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        setSelected(p);
        mapRef.current?.flyTo(p.coords, 15, { duration: 1.5 });
      });
      
      marker.addTo(markersGroupRef.current!);
    });
  }, [category]);

  // 3. Função de Rota Profissional
  const handleCalculateRoute = useCallback(() => {
    if (!selected || !mapRef.current || !userMarkerRef.current) {
      toast.error("Ative seu GPS para traçar a rota.");
      return;
    }

    setIsLoadingRoute(true);

    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
    }

    const start = userMarkerRef.current.getLatLng();
    const end = L.latLng(selected.coords[0], selected.coords[1]);

    const control = (L as any).Routing.control({
      waypoints: [start, end],
      router: (L as any).Routing.osrmv1({
        serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1",
        useHints: false,
      }),
      lineOptions: {
        styles: [
          { color: "#000", opacity: 0.2, weight: 10 }, // Sombra da linha
          { color: "#3b82f6", opacity: 0.9, weight: 6 }  // Linha principal
        ],
        addWaypoints: false,
      },
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
    }).addTo(mapRef.current);

    routingControlRef.current = control;

    control.on("routesfound", (e: any) => {
      setIsLoadingRoute(false);
      const dist = (e.routes[0].summary.totalDistance / 1000).toFixed(1);
      toast.success(`Rota pronta: ${dist}km`);
      mapRef.current?.fitBounds(L.latLngBounds([start, end]), { padding: [100, 100] });
    });

    control.on("routingerror", () => {
      toast.error("Erro ao conectar com o servidor de mapas.");
      setIsLoadingRoute(false);
    });
  }, [selected]);

  return (
    <div className="relative w-full h-screen bg-[#09090b]">
      <style jsx global>{`
        @keyframes pulse-ring { 0% { transform: scale(0.4); opacity: 0.8; } 100% { transform: scale(2.2); opacity: 0; } }
        .leaflet-routing-container { display: none !important; }
        .leaflet-container { background: #09090b !important; }
      `}</style>

      {/* HEADER DE BUSCA/FILTRO */}
      <div className="absolute inset-x-0 top-0 z-[1000] p-4 pointer-events-none">
        <div className="max-w-md mx-auto space-y-3">
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-3 pointer-events-auto shadow-2xl">
            <div className="bg-blue-600/20 p-2 rounded-xl text-blue-500"><MapIcon size={20} /></div>
            <div className="flex-1">
              <p className="text-[10px] uppercase font-black text-zinc-500 leading-none">Aloha Saquarema</p>
              <h1 className="text-sm font-bold leading-tight">Explorar Points</h1>
            </div>
            <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[150px]">
              {["Todas", "Praia", "Base"].map(c => (
                <button 
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${category === c ? "bg-white text-black border-white" : "bg-zinc-800 text-zinc-400 border-white/5"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO CENTRALIZAR GPS */}
      <button 
        onClick={() => userMarkerRef.current && mapRef.current?.flyTo(userMarkerRef.current.getLatLng(), 16)}
        className="absolute right-6 top-24 z-[1000] bg-zinc-900 border border-white/10 p-4 rounded-full shadow-2xl active:scale-90 transition-all pointer-events-auto"
      >
        <LocateFixed className="text-blue-500" size={24} />
      </button>

      {/* CONTAINER DO MAPA */}
      <div ref={mapContainerRef} className="w-full h-full grayscale-[0.2] brightness-[0.8]" />

      {/* CARD DE SELEÇÃO (ESTILO AIRBNB/UBER) */}
      <div className={`absolute inset-x-0 bottom-0 z-[1001] p-5 pb-8 transition-all duration-500 transform ${selected ? 'translate-y-0' : 'translate-y-full opacity-0'}`}>
        {selected && (
          <div className="max-w-md mx-auto bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-3xl">
            <div className="relative h-44">
              <img src={selected.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full text-white"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1 text-blue-500 mb-1">
                <Star size={14} className="fill-blue-500" />
                <span className="text-xs font-black">{selected.rating}</span>
                <span className="text-zinc-500 text-xs ml-1">• {selected.category}</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter">{selected.title}</h2>
              <p className="text-zinc-400 text-sm mb-6 flex items-center gap-1"><MapPin size={14} /> {selected.location}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => router.push(`/atividade/${selected.id}`)}
                  className="flex-[2] bg-zinc-100 text-black py-4 rounded-2xl font-black text-sm active:scale-95 transition-all"
                >
                  Ver Detalhes
                </button>
                <button 
                  onClick={handleCalculateRoute} 
                  disabled={isLoadingRoute}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
                >
                  {isLoadingRoute ? <Loader2 className="animate-spin" /> : <Navigation size={24} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}