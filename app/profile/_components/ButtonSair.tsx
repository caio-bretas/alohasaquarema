"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";


export function ButtonSair(){
    async function handleSair() {
        await signOut();
    }
    return(
            <button onClick={handleSair} className="w-full flex items-center justify-center gap-2 p-5 bg-red-50 text-red-600 rounded-[2rem] font-black text-xs uppercase tracking-widest border border-red-100 active:scale-95 transition-all mt-4">
          <LogOut className="size-5" />
          Sair da Conta
        </button>

    )
}