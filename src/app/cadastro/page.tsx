"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useState } from "react";

// ────────────────────────────────────────────────
// Schema Zod – centraliza TODAS as validações
// ────────────────────────────────────────────────
const cadastroSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .refine(
      (val) =>
        val.trim().split(/\s+/).length >= 2 &&
        val
          .trim()
          .split(/\s+/)
          .every((p) => p.length >= 2),
      "Digite o nome completo (nome + sobrenome)",
    ),
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .regex(/^\d{11}$/, "CPF deve conter apenas números")
    .refine((val) => {
      if (/^(\d)\1{10}$/.test(val)) return false;

      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(val[i]) * (10 - i);
      let rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(val[9])) return false;

      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(val[i]) * (11 - i);
      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) rest = 0;
      return rest === parseInt(val[10]);
    }, "CPF inválido"),
  telefone: z
    .string()
    .regex(
      /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/,
      "Formato inválido. Ex: (11) 98765-4321 ou 11987654321",
    ),
  email: z.string().email("Email inválido").toLowerCase(),
  senha: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos 1 letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos 1 letra minúscula")
    .regex(/\d/, "Deve conter pelo menos 1 número")
    .regex(
      /[@$!%*?&]/,
      "Deve conter pelo menos 1 caractere especial (@$!%*?&)",
    ),
});

type CadastroForm = z.infer<typeof cadastroSchema>;

export default function CadastroPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
    mode: "onChange", // valida em tempo real (mas sem re-render excessivo graças ao RHF)
  });

  const [apiMessage, setApiMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const onSubmit = async (data: CadastroForm) => {
    setApiMessage(null);

    const payload = {
      nome: data.nome.trim(),
      cpf: data.cpf, // já limpo pelo schema
      telefone: data.telefone,
      email: data.email,
      senha: data.senha,
    };

    try {
      console.log("🚀 Enviando requisição...");
      const response = await axios.post(
        "http://localhost:8081/auth/users",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      setApiMessage({
        type: "success",
        text: "Cadastro realizado com sucesso! 🎉",
      });

      reset(); // limpa o form
      console.log("✅ Resposta:", response.data);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Erro ao cadastrar. Tente novamente.";
      setApiMessage({ type: "error", text: msg });
      console.error("❌ Erro:", error);
    }
  };

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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    {...register("nome")}
                    placeholder="José da Silva"
                  />
                  {errors.nome && (
                    <p className="text-red-500 text-sm">
                      {errors.nome.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    {...register("cpf")}
                    placeholder="00000000000"
                    maxLength={11}
                  />
                  {errors.cpf && (
                    <p className="text-red-500 text-sm">{errors.cpf.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    {...register("telefone")}
                    placeholder="(11) 98765-4321"
                  />
                  {errors.telefone && (
                    <p className="text-red-500 text-sm">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    {...register("senha")}
                    placeholder="••••••••"
                  />
                  {errors.senha && (
                    <p className="text-red-500 text-sm">
                      {errors.senha.message}
                    </p>
                  )}
                </div>

                {apiMessage && (
                  <p
                    className={`text-sm font-medium text-center ${
                      apiMessage.type === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {apiMessage.text}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
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
