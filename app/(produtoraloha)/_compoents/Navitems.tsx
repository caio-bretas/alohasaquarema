import {
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  Settings,
  PlusCircle,
  MapPin
} from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import Link from "next/link"

type NavItem = {
  label: string
  path: string
  icon: React.ElementType
}

export function NavItems() {
  const mainItems: NavItem[] = [
    {
      label: "Visão Geral",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Meus Eventos",
      path: "/meventos",
      icon: Ticket,
    },
    {
      label: "Participantes",
      path: "/participantes",
      icon: Users,
    },

  ]

  const configItems: NavItem[] = [
    
    {
      label: "Configurações",
      path: "/configuracoes",
      icon: Settings,
    },
  ]

  return (
    <div className="space-y-4">
      <SidebarGroup>
        <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          Gestão
        </SidebarGroupLabel>
        <SidebarMenu>
          {mainItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              {/* ✅ asChild aqui previne o erro de Hydration */}
              <SidebarMenuButton  tooltip={item.label}>
                <Link href={item.path} className="flex items-center gap-2">
                  <item.icon className="size-4" />
                  <span className="font-bold text-sm  tracking-tighter">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          Sistema
        </SidebarGroupLabel>
        <SidebarMenu>
          {configItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton  tooltip={item.label}>
                <Link href={item.path} className="flex items-center gap-2">
                  <item.icon className="size-4" />
                  <span className="font-bold text-sm  tracking-tighter">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  )
}