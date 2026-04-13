"use client";

import { useFormContext } from "react-hook-form";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { SectionTitle } from "../ui/fields";

export function StepReview() {
  const { getValues } = useFormContext();
  const data = getValues();

  // Formatação simples de data para exibição
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Não definida";
    return new Date(dateStr).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const SummaryItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-3 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
      <div className="p-2 bg-white rounded-lg border border-zinc-200 shadow-sm">
        <Icon className="size-4 text-blue-600" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{label}</p>
        <p className="text-sm font-bold text-zinc-700">{value || "—"}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center size-12 bg-green-100 text-green-600 rounded-full mb-2">
          <CheckCircle2 className="size-6" />
        </div>
        <h2 className="text-xl font-black text-zinc-800">Tudo pronto!</h2>
        <p className="text-sm text-zinc-500">Revise as informações do seu evento antes de publicar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryItem 
          icon={Tag} 
          label="Nome do Evento" 
          value={data.title} 
        />
        <SummaryItem 
          icon={Calendar} 
          label="Data de Início" 
          value={formatDate(data.startDate)} 
        />
        <SummaryItem 
          icon={MapPin} 
          label="Local" 
          value={`${data.venueName} - ${data.city}/${data.state}`} 
        />
        <SummaryItem 
          icon={Users} 
          label="Capacidade" 
          value={`${data.capacity} pessoas`} 
        />
      </div>

      <div className="space-y-4">
        <SectionTitle>Configurações Ativas</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {data.requiresCpf && <Badge label="Exige CPF" />}
          {data.allowTransfer && <Badge label="Permite Transferência" />}
          {data.absorveFee && <Badge label="Taxas Absorvidas" />}
          {data.isPrivate && <Badge label="Evento Privado" color="bg-orange-100 text-orange-700" />}
        </div>
      </div>

      {/* Aviso de Confirmação */}
      <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl flex gap-3">
        <AlertCircle className="size-5 text-blue-600 shrink-0" />
        <p className="text-xs text-blue-800 leading-relaxed">
          Ao publicar, o evento ficará disponível para venda imediatamente (ou conforme a data programada). 
          Certifique-se de que os dados de repasse bancário estão atualizados no seu perfil.
        </p>
      </div>
    </div>
  );
}

function Badge({ label, color = "bg-blue-100 text-blue-700" }: { label: string, color?: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${color}`}>
      {label}
    </span>
  );
}