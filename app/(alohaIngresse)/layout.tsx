import { BottomNav } from "@/components/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <body className="min-h-full flex flex-col">{children}
     
         <BottomNav />
    
      
      </body>

  );
}
