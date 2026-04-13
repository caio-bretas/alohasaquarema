"use client";

import { User, Building2, Bell, ShieldCheck, CreditCard } from "lucide-react";

const tabs = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'org', label: 'Produtora', icon: Building2 },
  { id: 'billing', label: 'Financeiro', icon: CreditCard },
  { id: 'security', label: 'Segurança', icon: ShieldCheck },
  { id: 'notif', label: 'Notificações', icon: Bell },
];

export function SettingsNav() {
  return (
    <div className="flex lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
            ${tab.id === 'profile' ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200' : 'text-zinc-500 hover:bg-zinc-100'}
          `}
        >
          <tab.icon className="size-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}