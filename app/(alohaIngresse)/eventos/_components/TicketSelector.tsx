"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Minus,
  Plus,
  Ticket,
} from "lucide-react";

import {
  Camarote,
  MapaEventos,
} from "./MapaEventos";

type BatchType = {
  id: string;
  name: string;
  price: number;
};

type TicketType = {
  id: string;
  name: string;
  isVip: boolean;
  batches: BatchType[];
  seats: Camarote[];
};

type CheckoutItem = {
  batchId: string;
  quantity: number;
  name: string;
  unitPrice: number;
  totalPrice: number;
  seatIds?: string[];
};

interface TicketSelectorProps {
  ticketTypes: TicketType[];
  eventId: string;
  session: any;
}

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function getLowestBatch(batches: BatchType[]) {
  return [...batches].sort(
    (a, b) => a.price - b.price,
  )[0];
}

export function TicketSelector({
  ticketTypes,
  eventId,
  session,
}: TicketSelectorProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] =
    useState<"tickets" | "camarote">("tickets");

  const [selectedCamarote, setSelectedCamarote] =
    useState<Camarote | null>(null);

  const [quantities, setQuantities] =
    useState<Record<string, number>>({});

  const pistaTickets = useMemo(
    () =>
      ticketTypes.filter(
        (ticketType) =>
          ticketType.seats.length === 0,
      ),
    [ticketTypes],
  );

  const camaroteTickets = useMemo(
    () =>
      ticketTypes.filter(
        (ticketType) =>
          ticketType.seats.length > 0,
      ),
    [ticketTypes],
  );

  const camarotes = useMemo(
    () =>
      camaroteTickets.flatMap(
        (ticketType) => ticketType.seats,
      ),
    [camaroteTickets],
  );

  const selectedTicketType = useMemo(() => {
    if (!selectedCamarote) return null;

    return (
      camaroteTickets.find(
        (ticketType) =>
          ticketType.id ===
          selectedCamarote.ticketTypeId,
      ) ?? null
    );
  }, [selectedCamarote, camaroteTickets]);

  const selectedCamaroteBatch = useMemo(() => {
    if (!selectedTicketType) return null;

    return (
      getLowestBatch(
        selectedTicketType.batches,
      ) ?? null
    );
  }, [selectedTicketType]);

  const pistaTotal = useMemo(() => {
    return pistaTickets.reduce(
      (totalValue, ticketType) => {
        const quantity =
          quantities[ticketType.id] || 0;

        const batch = getLowestBatch(
          ticketType.batches,
        );

        if (!batch) return totalValue;

        return (
          totalValue +
          quantity * batch.price
        );
      },
      0,
    );
  }, [pistaTickets, quantities]);

  const camaroteTotal =
    selectedCamaroteBatch?.price ?? 0;

  const total =
    activeTab === "camarote"
      ? camaroteTotal
      : pistaTotal;

  function increase(id: string) {
    setQuantities((previous) => ({
      ...previous,
      [id]: (previous[id] || 0) + 1,
    }));
  }

  function decrease(id: string) {
    setQuantities((previous) => ({
      ...previous,
      [id]: Math.max(
        0,
        (previous[id] || 0) - 1,
      ),
    }));
  }

  async function handleReserve() {
    if (!session?.user?.id) {
      router.push(
        `/login?callbackUrl=/eventos/${eventId}`,
      );
      return;
    }

    const items: CheckoutItem[] = [];

    if (activeTab === "tickets") {
      pistaTickets.forEach((ticketType) => {
        const quantity =
          quantities[ticketType.id] || 0;

        const batch = getLowestBatch(
          ticketType.batches,
        );

        if (quantity > 0 && batch) {
          items.push({
            batchId: batch.id,
            quantity,
            name: ticketType.name,
            unitPrice: batch.price,
            totalPrice:
              batch.price * quantity,
          });
        }
      });
    } else {
      if (
        !selectedCamarote ||
        !selectedCamaroteBatch ||
        !selectedTicketType
      ) {
        return;
      }

      items.push({
        batchId: selectedCamaroteBatch.id,
        quantity: 1,
        name: `${selectedTicketType.name} - ${selectedCamarote.label}`,
        unitPrice:
          selectedCamaroteBatch.price,
        totalPrice:
          selectedCamaroteBatch.price,
        seatIds: [selectedCamarote.id],
      });
    }

    if (items.length === 0) return;

    try {
      setLoading(true);

      localStorage.setItem(
        "checkout_data",
        JSON.stringify({
          eventId,
          purchaseType:
            activeTab === "camarote"
              ? "CAMAROTE"
              : "TICKET",
          items,
          total,
        }),
      );

      router.push("/checkout");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const canReserve =
    activeTab === "camarote"
      ? Boolean(
          selectedCamarote &&
            selectedCamaroteBatch,
        )
      : pistaTotal > 0;

  return (
    <div className="space-y-5">
      <div className="flex gap-1 rounded-xl bg-zinc-100/80 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("tickets")}
          className={`flex-1 rounded-lg py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
            activeTab === "tickets"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500"
          }`}
        >
          Pista / VIP
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveTab("camarote")
          }
          className={`flex-1 rounded-lg py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
            activeTab === "camarote"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500"
          }`}
        >
          Camarotes
        </button>
      </div>

      {activeTab === "tickets" ? (
        <div className="space-y-4">
          {pistaTickets.map((ticketType) => {
            const batch = getLowestBatch(
              ticketType.batches,
            );

            if (!batch) return null;

            return (
              <div
                key={ticketType.id}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-tight text-zinc-900">
                    {ticketType.name}
                  </h4>

                  <p className="mt-0.5 text-sm font-black text-zinc-900">
                    {currency.format(batch.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-50 p-1">
                  <button
                    type="button"
                    onClick={() =>
                      decrease(ticketType.id)
                    }
                    className="flex size-7 items-center justify-center rounded-md border border-zinc-200 bg-white"
                  >
                    <Minus className="size-3" />
                  </button>

                  <span className="w-5 text-center text-xs font-bold">
                    {quantities[
                      ticketType.id
                    ] || 0}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increase(ticketType.id)
                    }
                    className="flex size-7 items-center justify-center rounded-md bg-zinc-900 text-white"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <MapaEventos
            camarotes={camarotes}
            selectedId={
              selectedCamarote?.id ?? null
            }
            onSelect={setSelectedCamarote}
          />

          {selectedCamarote &&
            selectedTicketType &&
            selectedCamaroteBatch && (
              <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-blue-500">
                    Selecionado
                  </p>

                  <p className="font-black italic text-zinc-900">
                    {selectedCamarote.label}
                  </p>

                  {selectedCamarote.capacity >
                    1 && (
                    <p className="text-[9px] font-bold text-zinc-500">
                      Capacidade:{" "}
                      {
                        selectedCamarote.capacity
                      }{" "}
                      pessoas
                    </p>
                  )}
                </div>

                <span className="font-black italic text-blue-600">
                  {currency.format(
                    selectedCamaroteBatch.price,
                  )}
                </span>
              </div>
            )}
        </div>
      )}

      <div className="border-t border-zinc-100 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
              Subtotal
            </span>

            <span className="text-2xl font-black italic leading-none text-zinc-900">
              {currency.format(total)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReserve}
          disabled={!canReserve || loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Ticket className="size-4" />
          )}

          {loading
            ? "Preparando checkout..."
            : activeTab === "camarote"
              ? "Reservar Camarote"
              : "Reservar Agora"}
        </button>
      </div>
    </div>
  );
}