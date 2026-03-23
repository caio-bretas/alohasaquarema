import Image from "next/image";
import itauna from "@/public/voo.jpg"
import { MapPin } from "lucide-react";
export function CardImg(){
    return(
        <div className="grid grid-cols-2 gap-4">
            <div className="mt-4 flex flex-col gap-2 items-start   rounded-2xl bg-zinc-100/50">
                <Image
                src={itauna}
                alt="algo"
                
                className="w-full h-full rounded-t-2xl border-b border-zinc-700 pb-3"
                />
                <div className="pb-3 px-1.5">
                    <h1 className="flex items-center font-semibold gap-2 text-sm text-zinc-900  "> voo Livre </h1>
                   <span className="flex items-center gap-2 text-sm text-blue-600   "><MapPin className="size-4" /> Serra do Mato Grosso, Rj</span>
                </div>
            </div>

             <div className="mt-4 flex flex-col gap-2 items-start   rounded-2xl bg-zinc-100/50">
                <Image
                src={itauna}
                alt="algo"
                
                className="w-full h-full rounded-t-2xl border-b border-zinc-700 pb-3"
                />
                <div className="pb-3 px-1.5">
                    <h1 className="flex items-center font-semibold gap-2 text-sm text-zinc-900  "> voo Livre </h1>
                   <span className="flex items-center gap-2 text-sm text-blue-600   "><MapPin className="size-4" /> Serra do Mato Grosso, Rj</span>
                </div>
            </div>
            
        </div>
    )
}