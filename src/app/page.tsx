import { ModeToggle } from "@/components/custom/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br">
      <header className="p-6 flex justify-end">
        <ModeToggle />
      </header>

      <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-8 text-center">
        <Card className="w-full max-w-2xl border-0 backdrop-blur-xl">
          <CardHeader className="space-y-6">
            <div className="mx-auto w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-5xl">
              🏛️
            </div>
            <CardTitle className="text-5xl font-bold tracking-tighter">
              Cada Traço Arquitetura
            </CardTitle>
            <CardDescription className="text-2xl max-w-md mx-auto">
              O sistema mais moderno para arquitetos.
              <br />
              Projetos, clientes e cronogramas em um só lugar.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <Link href="/login">
              <Button size="lg" className="w-full text-xl py-8 font-semibold">
                Entrar no Sistema
              </Button>
            </Link>
            <Link href="/registration" className="mt-4 block">
              <Button size="lg" className="w-full text-xl py-8 font-semibold">
                Criar Conta
              </Button>
            </Link>

            <p className="text-sm text-zinc-500 mt-6">
              Ainda não tem conta?{" "}
              <span className="text-orange-400 underline">
                Entre em contato
              </span>
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center py-8 text-zinc-500 text-sm">
        © 2026 Cada Traço Arquitetura • Feito com ❤️ em Next.js 16 + shadcn/ui
      </footer>
    </div>
  );
}
