import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cada Traço Arquitetura | Sistema de Gerenciamento de Projetos",
  description: "Sistema moderno de arquitetura para controle de projetos, clientes, cronogramas e entregas. Acesse agora em cadatraco.com",
  keywords: ["arquitetura", "projetos de arquitetura", "gerenciamento de obras", "cada traço arquitetura", "sistema para arquitetos"],
  authors: [{ name: "Cada Traço Arquitetura" }],
  openGraph: {
    title: "Cada Traço Arquitetura",
    description: "Seja bem-vindo ao sistema mais moderno para arquitetos",
    images: [{ url: "https://archeiro.vercel.app/og-image.png" }], // vamos criar depois
    url: "https://archeiro.vercel.app",
    siteName: "Cada Traço Arquitetura",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}