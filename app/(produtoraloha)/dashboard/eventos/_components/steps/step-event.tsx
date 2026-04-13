"use client";

import { useFormContext } from "react-hook-form";
import { Image as ImageIcon, Info } from "lucide-react";
import { FormField, Label, SectionTitle, Select } from "../ui/fields";

import { Textarea } from "@/components/ui/textarea";


const CATEGORIES = [
  "PAGODE", "SAMBA", "FORRÓ", "ELETRÔNICO", "ROCK",
  "AXÉ", "SERTANEJO", "FESTA", "TEATRO", "ESPORTE", "OUTRO",
];

export function StepEvento() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();

  // Mapeamento para os checkboxes (Configurações Gerais)
  const settings = [
    { key: "requiresCpf", label: "Exigir CPF na compra", hint: "Recomendado para eventos com classificação etária" },
    { key: "allowTransfer", label: "Permitir transferência", hint: "Compradores poderão transferir ingressos" },
    { key: "absorveFee", label: "Absorver taxa da plataforma", hint: "A taxa de 10% será descontada do seu repasse" },
    { key: "isPrivate", label: "Evento privado", hint: "Não aparece na listagem pública" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1>Informações Principais</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormField
            name="title"
            label="Nome do Evento *"
            placeholder="Ex: Samba do Amor — Edição Verão 2025"
          />
        </div>

        <div>
          <Label>Categoria *</Label>
          <Select name="category">
            <option value="">Selecione...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </div>

        <div>
          <Label hint="A classificação etária será exibida na página do evento">
            Classificação Etária *
          </Label>
          <Select name="ageRating">
            <option value="0">Livre</option>
            <option value="10">10 anos</option>
            <option value="12">12 anos</option>
            <option value="14">14 anos</option>
            <option value="16">16 anos</option>
            <option value="18">18 anos</option>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label>Descrição do Evento</Label>
          <Textarea
            name="description"
            rows={4}
            placeholder="Descreva o evento, atrações, programação..."
          />
        </div>

        <FormField
          name="tags"
          label="Tags"
          placeholder="pagode, verão, saquarema"
        />

        <FormField
          name="capacity"
          label="Capacidade Total *"
          type="number"
          placeholder="Ex: 1500"
        />
      </div>

      <SectionTitle>Datas e Horários</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField name="startDate" label="Início do Evento *" type="datetime-local" />
        <FormField name="endDate" label="Fim do Evento *" type="datetime-local" />
        <FormField name="doorsOpenAt" label="Abertura dos Portões" type="datetime-local" />
        <FormField name="salesEndAt" label="Vendas Encerram em" type="datetime-local" />
      </div>

      <SectionTitle>Imagens do Evento</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["cover", "banner"].map((type) => (
          <div key={type}>
            <Label>{type === "cover" ? "Capa do Evento *" : "Banner (opcional)"}</Label>
            <label className="group block border-2 border-dashed border-zinc-200 rounded-2xl h-40 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-2">
              <ImageIcon className="size-8 text-zinc-300 group-hover:text-blue-400 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Clique para enviar</span>
              <input type="file" {...register(type)} className="hidden" accept="image/*" />
            </label>
          </div>
        ))}
      </div>

      <SectionTitle>Configurações Gerais</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {settings.map(({ key, label, hint }) => (
          <label key={key} className="flex items-center justify-between bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-700">{label}</span>
              <span title={hint}><Info className="size-3 text-zinc-400" /></span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register(key)}
              />
              <div className="w-10 h-5 bg-zinc-200 peer-checked:bg-blue-600 rounded-full transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-all peer-checked:translate-x-5" />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}