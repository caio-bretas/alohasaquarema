import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./_compoents/AppSidebar";
import { auth } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <SidebarProvider>
      {/* O TooltipProvider deve vir aqui para cobrir a Sidebar e o Conteúdo */}
      <TooltipProvider delayDuration={0}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-[60px] shrink-0 border-b items-center justify-between px-4">
            <div className="flex-1 flex items-center md:gap-18 gap-4">
              <SidebarTrigger className="flex md:hidden" />
              <h1 className="text-sm font-black uppercase italic">Dashboard Aloha</h1>
            </div>
          </header>
          
          <main className="flex flex-1 flex-col p-4">
            {children}
          </main>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}