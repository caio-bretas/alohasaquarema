"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  QrCode,
  CheckCircle2,
  ChevronLeft,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pixCode, setPixCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("checkout_data");
    if (storage) {
      setData(JSON.parse(storage));
    }
  }, []);

  const copyToClipboard = () => {
    if (!pixCode) return;
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function handlePixPayment() {
    try {
      setLoading(true);
      const response = await fetch("/api/fake-pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: data.session.user.id,
          eventId: data.eventId,
          items: data.items,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        alert("Erro ao gerar PIX");
        return;
      }

      setPixCode(result.pixCode?.pixCode || "");

      // Simulação de processamento de pagamento
      setTimeout(() => {
        setSuccess(true);
        localStorage.removeItem("checkout_data");
        setTimeout(() => {
          router.push("/meusingressos");
        }, 3000);
      }, 4000);
    } catch (error) {
      console.error(error);
      alert("Erro no pagamento");
    } finally {
      setLoading(false);
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="size-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header Voltar */}
        {!success && (
          <Link
            href="/"
            className="mb-6 flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors group"
          >
            <ChevronLeft className="size-5 group-active:scale-75 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Voltar
            </span>
          </Link>
        )}

        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-zinc-100 relative overflow-hidden">
          {!success ? (
            <>
              <header className="mb-8">
                <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em]">
                  Pagamento Segurado
                </span>
                <h1 className="text-3xl font-black italic mt-1 leading-tight uppercase tracking-tighter">
                  Checkout
                </h1>
              </header>

              {/* Lista de Itens */}
              <div className="space-y-3">
                {data.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-zinc-50 border border-zinc-100 rounded-2xl p-4"
                  >
                    <div>
                      <p className="font-black text-xs uppercase italic text-zinc-900">
                        Ingresso Evento
                      </p>
                      <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-tighter">
                        Qtd: {item.quantity}
                      </span>
                    </div>
                    <span className="font-black italic text-zinc-900">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(data.total)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-8 pt-6 border-t border-dashed border-zinc-200 flex justify-between items-end">
                <span className="text-zinc-400 uppercase text-[10px] font-black tracking-widest">
                  Total
                </span>
                <span className="text-4xl font-black italic tracking-tighter text-blue-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(data.total)}
                </span>
              </div>

              {/* Área do PIX */}
              {pixCode && (
                <div className="mt-8 bg-zinc-900 rounded-[2rem] p-6 text-white animate-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <QrCode className="size-4 text-blue-400" />
                      <span className="font-black uppercase text-[10px] tracking-widest">
                        Pix Copia e Cola
                      </span>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      {copied ? (
                        <Check className="size-4 text-green-400" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </div>
                  <p className="break-all text-[10px] font-mono text-zinc-400 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                    {pixCode}
                  </p>
                </div>
              )}

              <button
                onClick={handlePixPayment}
                disabled={loading || !!pixCode}
                className={`w-full mt-8 py-5 rounded-[1.5rem] font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg ${
                  pixCode 
                  ? "bg-zinc-100 text-zinc-400 cursor-default shadow-none" 
                  : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
                }`}
              >
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <QrCode className="size-5" />
                )}
                {loading ? "Processando..." : pixCode ? "Aguardando Pagamento" : "Gerar QR Code PIX"}
              </button>
            </>
          ) : (
            /* Tela de Sucesso */
            <div className="py-10 flex flex-col items-center text-center animate-in zoom-in duration-500">
              <div className="size-28 rounded-full bg-green-50 flex items-center justify-center mb-8 border border-green-100">
                <CheckCircle2 className="size-16 text-green-500" />
              </div>

              <h2 className="text-3xl font-black italic text-zinc-900 uppercase tracking-tighter leading-none">
                Pagamento <br /> <span className="text-green-500">Confirmado!</span>
              </h2>

              <p className="mt-4 text-zinc-400 text-[11px] font-bold uppercase tracking-widest max-w-[240px]">
                Seu ingresso já está disponível na sua carteira.
              </p>

              <div className="mt-12 flex flex-col items-center gap-2">
                <Loader2 className="size-4 animate-spin text-zinc-200" />
                <div className="text-[9px] uppercase tracking-[0.3em] text-zinc-300 font-black">
                  Redirecionando para seus ingressos
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}