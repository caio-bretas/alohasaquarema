"use client";

import { useFormContext } from "react-hook-form";
import { MapPin } from "lucide-react";
import { SectionTitle, FormField, Select, Label } from "../ui/fields";

const ESTADOS = ["RJ", "SP", "MG", "ES", "BA", "PE", "CE", "RS", "PR", "SC"];

export function StepLocation() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <SectionTitle>Local do Evento</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormField
            name="venueName"
            label="Nome do Local / Espaço *"
            placeholder="Ex: Praça Orlando de Barros Pimentel, Bar do Zé..."
          />
        </div>

        <div className="md:col-span-2">
          <FormField
            name="address"
            label="Endereço Completo *"
            placeholder="Rua, número, bairro"
          />
        </div>

        <div>
          <FormField
            name="city"
            label="Cidade *"
            placeholder="Ex: Saquarema"
          />
        </div>

        <div>
          <Label>Estado *</Label>
          <Select name="state">
            {ESTADOS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </div>

        <div>
          <FormField
            name="zipCode"
            label="CEP"
            placeholder="28990-000"
          />
        </div>

        <div>
          <FormField
            name="maxPerOrder"
            label="Máx. Ingressos por Pedido"
            type="number"
            min={1}
            max={20}
            hint="Máximo de ingressos que uma pessoa pode comprar por pedido"
          />
        </div>
      </div>

      {/* Mapa placeholder estilizado */}
      <div className="relative group border-2 border-dashed border-zinc-200 rounded-2xl h-52 flex flex-col items-center justify-center gap-2 bg-zinc-50 overflow-hidden transition-all hover:border-blue-300 hover:bg-blue-50/30">
        <div className="absolute inset-0 bg-[url('https://www.google.com/maps/d/thumbnail?mid=1_xyz')] opacity-10 grayscale group-hover:opacity-20 transition-opacity" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
            <MapPin className="size-6 text-blue-500" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
            Mapa Interativo
          </p>
          <p className="text-[9px] text-zinc-400 font-medium">
            Integração com Google Maps — em breve
          </p>
        </div>
      </div>
    </div>
  );
}