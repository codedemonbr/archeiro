"use client";

import { ModeToggle } from "@/components/custom/ModeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegistrationForm } from "@/features/auth/components/RegistrationForm";
import { useRegistration } from "@/features/auth/hooks/useRegistration";
import Link from "next/link";

export default function CadastroPage() {
  const { form, onSubmit, isSubmitting, errors } = useRegistration();

  return (
    <div>
      <header className="flex justify-end m-8">
        <ModeToggle />
      </header>

      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Cadastro</CardTitle>
              <CardDescription>
                Cadastre sua conta do Cada Traço Arquitetura
              </CardDescription>
            </CardHeader>

            <CardContent>
              <RegistrationForm
                form={form}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
              />
            </CardContent>

            <CardFooter>
              <Link
                href="/"
                className="text-sm text-zinc-400 hover:text-white underline mx-auto"
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
