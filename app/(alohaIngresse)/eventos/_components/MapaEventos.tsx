"use client";

import {
  CheckCircle2,
  Map as MapIcon,
  Users,
} from "lucide-react";

export type CamaroteStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "SOLD"
  | "BLOCKED";

export interface Camarote {
  id: string;
  ticketTypeId: string;
  row: string;
  number: number;
  label: string;
  capacity: number;
  status: CamaroteStatus;
  reservedUntil: Date | string | null;
}

interface MapaEventosProps {
  camarotes: Camarote[];
  selectedId: string | null;
  onSelect: (camarote: Camarote | null) => void;
}

export function MapaEventos({
  camarotes,
  selectedId,
  onSelect,
}: MapaEventosProps) {
  function isAvailable(camarote: Camarote) {
    if (camarote.status === "AVAILABLE") {
      return true;
    }

    if (
      camarote.status === "RESERVED" &&
      camarote.reservedUntil
    ) {
      return (
        new Date(camarote.reservedUntil).getTime() <=
        Date.now()
      );
    }

    return false;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <MapIcon className="size-3.5 text-zinc-500" />

          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Mapa
          </span>
        </div>

        <div className="flex gap-2 text-[9px] font-bold uppercase text-zinc-400">
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-blue-600" />
            Livre
          </span>

          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-zinc-300" />
            Ocupado
          </span>
        </div>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm">
        <div className="absolute left-1/2 top-0 flex h-5 w-1/3 -translate-x-1/2 items-center justify-center rounded-b-lg bg-zinc-900">
          <span className="text-[7px] font-bold uppercase tracking-widest text-white">
            Palco
          </span>
        </div>

        <div className="absolute inset-0 grid grid-cols-3 gap-2 p-6 pt-9 md:p-10">
          {camarotes.map((camarote) => {
            const available = isAvailable(camarote);
            const selected = selectedId === camarote.id;

            return (
              <button
                key={camarote.id}
                type="button"
                disabled={!available}
                aria-pressed={selected}
                onClick={() =>
                  onSelect(selected ? null : camarote)
                }
                className={`
                  relative flex flex-col items-center justify-center rounded-xl border
                  transition-all active:scale-95
                  ${
                    !available
                      ? "cursor-not-allowed border-zinc-200 bg-zinc-100 opacity-40"
                      : selected
                        ? "border-blue-600 bg-blue-600 text-white shadow-md"
                        : "border-zinc-200 bg-white text-zinc-900 shadow-sm hover:border-blue-300"
                  }
                `}
              >
                <span className="text-[11px] font-black italic">
                  {camarote.label}
                </span>

                {camarote.capacity > 1 && (
                  <span className="mt-0.5 flex items-center gap-1 text-[7px] font-bold uppercase opacity-70">
                    <Users className="size-2.5" />
                    {camarote.capacity}
                  </span>
                )}

                {selected && (
                  <CheckCircle2 className="mt-1 size-3" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {camarotes.length === 0 && (
        <p className="py-4 text-center text-[10px] font-bold uppercase text-zinc-400">
          Nenhum camarote cadastrado
        </p>
      )}
    </div>
  );
}