import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";
import PWARegistration from "@/components/PWARegistration";
import InstallButton from "@/components/buttonapp";
import { Toaster, toast } from 'sonner';
const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Aloha saquarema",
  description: "Gerado pelo Next.js",
  manifest: "/manifest.json",
  icons: {
    icon: "/aloha.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aloha saquarema",
    
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <head>
       <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/aloha.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}
       <Toaster />
        
         <PWARegistration />
         <InstallButton />
      </body>
     
    </html>
  );
}
