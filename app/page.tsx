import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/custom/ModeToggle";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="p-4 flex justify-end">
        <ModeToggle />
      </header>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Cada Traço Arquitetura</CardTitle>
            <CardDescription>Seja bem-vindo ao nosso sistema de arquitetura!</CardDescription>
            <CardAction><Button variant="link">Sign Up</Button></CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>

          </CardFooter>
        </Card>

      </div>
    </div>

  );
}
