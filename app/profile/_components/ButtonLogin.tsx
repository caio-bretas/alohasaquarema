"use client"
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import GithubIcon from "@/public/github.svg" // Renomeado para clareza
import { signIn } from "next-auth/react";
import { useState } from "react";

export function ButtonLogin() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        setIsLoading(true);
        try {
            await signIn('github', { redirectTo: '/profile' });
        } catch (error) {
            setIsLoading(false);
        }
    }

    return (
        <div className="group w-full max-w-sm mx-auto">
            <button 
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-zinc-50 p-2 rounded-xl group-hover:bg-zinc-100 transition-colors">
                        <Image 
                            src={GithubIcon} 
                            alt="GitHub" 
                            width={24} 
                            height={24} 
                            className={isLoading ? "animate-pulse" : ""}
                        />
                    </div>
                    <div className="flex flex-col items-start text-left">
                        <span className="text-sm font-semibold text-zinc-900">
                            {isLoading ? "Conectando..." : "Entrar com GitHub"}
                        </span>
                        <span className="text-xs text-zinc-500 font-normal">Acesso rápido e seguro</span>
                    </div>
                </div>
                
                <ChevronRight className="size-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}