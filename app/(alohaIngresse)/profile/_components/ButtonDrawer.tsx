"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { ChevronRight, Settings } from "lucide-react"
import { User, Lock, CreditCard, CircleHelp } from "lucide-react"
import { FormEditPerfil } from "./FormEditPerfil"

const icons = {
  user: User,
  lock: Lock,Settings,
  "credit-card": CreditCard,
  help: CircleHelp,
}
type Props = {
  item: any
  email: string
  name: string
  phone?: string
}
export function ButtonDrawer({ item, email, name , phone}: Props) {
const Icon = icons[item.icon as keyof typeof icons]
function renderContent(label: string) {
  switch (label) {
    case "Informações Pessoais":
      return <FormEditPerfil phone={phone} email={email} nome={name} /> 

    case "Configuração":
      return <h1>Segurança e Senha ss</h1>

    case "Métodos de Pagamento":
      return  <h1>Métodos de Pagamento ss</h1>

    case "Central de Ajuda":
      return  <h1>Central de Ajuda ss</h1>

    default:
      return <div>Em breve...</div>
  }
}
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="w-full flex items-center justify-between p-5 active:bg-zinc-50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${item.bg}`}>
              <Icon className={`size-5 ${item.color}`} />
            </div>
            <span className="text-sm font-bold text-zinc-700">
              {item.label}
            </span>
          </div>

          <ChevronRight className="size-4 text-zinc-300" />
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{item.label}</DrawerTitle>
        </DrawerHeader>

       <div className="p-4">
    {renderContent(item.label)}
  </div>
      </DrawerContent>
    </Drawer>
  )
}