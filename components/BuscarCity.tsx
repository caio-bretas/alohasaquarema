import { Searchcity } from "./Searchcity";

export function BuscarCity(){
    return(
        <div className="flex flex-col w-full gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Olá, Pedro ✋</h1>
              <p className="text-zinc-500 text-sm">O que vamos descobrir hoje?</p>
            </div>
            <Searchcity />
        </div>
    )
}