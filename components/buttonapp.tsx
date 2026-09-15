"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();

      const wasDismissed = sessionStorage.getItem(
        "pwa-install-dismissed"
      );

      if (wasDismissed) return;

      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("Usuário instalou ✅");
    } else {
      console.log("Usuário cancelou ❌");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleClose = () => {
    sessionStorage.setItem("pwa-install-dismissed", "true");
    setIsVisible(false);
  };

  if (!deferredPrompt || !isVisible) return null;

  return (
    <div className="fixed left-1/2 top-4 z-[9999] w-[calc(100%-32px)] max-w-md -translate-x-1/2">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        {/* Decoração */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />

        {/* Botão fechar */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fechar aviso de instalação"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-xl text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          ×
        </button>

        <div className="flex items-center gap-3 pr-9">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-2xl shadow-lg">
            📲
          </div>

          <div>
            <h2 className="font-semibold text-zinc-950 dark:text-white">
              Instale nosso aplicativo
            </h2>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Tenha acesso rápido diretamente pela tela inicial.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleInstall}
          className="mt-4 w-full rounded-xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Instalar aplicativo
        </button>
      </div>
    </div>
  );
}