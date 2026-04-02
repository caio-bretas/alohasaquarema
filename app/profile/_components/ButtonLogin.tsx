"use client"
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Google from "@/public/github.svg"
import { signIn } from "next-auth/react";
export  function ButtonLogin() {
    async function handleLogin() {
        await signIn('github', {redirectTo: '/profile'});
    }
    return(
         <div className="bg-white border border-zinc-100 rounded-[1rem] overflow-hidden shadow-sm">
               
                  <button 
                  onClick={handleLogin}
                    className={"w-full flex items-center justify-between p-5 active:bg-zinc-50 transition-all "}  
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-1 rounded-2xl `}>
                       <Image src={Google} alt="Google" width={24} height={24} />
                      </div>
                      <span className="text-sm font-bold text-zinc-700">Login com GitHub</span>
                    </div>
                    <ChevronRight className="size-4 text-zinc-300" />
                  </button>
        
              </div>
    )
    
}