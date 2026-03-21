import { ModeToggle } from "@/components/custom/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <header className="flex justify-end m-8">
        <ModeToggle />
      </header>
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Login</CardTitle>
              <CardDescription>
                Acesse sua conta do Cada Traço Arquitetura
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      href="#"
                      className="text-sm text-orange-500 hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>

              <Link
                href="/"
                className="text-sm text-zinc-400 hover:text-white underline"
              >
                ← Voltar para a página inicial
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
