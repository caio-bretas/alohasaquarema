import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "lucide-react"
import { FormEditPerfil } from "./FormEditPerfil"
import { Button } from "@/components/ui/button"
interface UserData{
  
        nome: string,
        email: string
   
}
export function ButtonEditPerfil({email,nome}:UserData){
    return(
<>
<Dialog>
    <DialogTrigger asChild>
            <Button className="bg-white border border-zinc-200 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 shadow-sm active:bg-zinc-50">
            Editar Perfil
          </Button>
   
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormEditPerfil nome={nome} email={email} />
    </DialogContent>
</Dialog>
</>
    )
}