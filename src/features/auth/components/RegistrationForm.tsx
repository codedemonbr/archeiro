"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RegistrationForm } from "@/types/auth";
import type { UseFormReturn } from "react-hook-form";

interface RegistrationFormProps {
  form: UseFormReturn<RegistrationForm>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function RegistrationForm({
  form,
  onSubmit,
  isSubmitting,
}: RegistrationFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="nome">Nome completo</Label>
        <Input id="nome" {...register("nome")} placeholder="José da Silva" />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
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
          <p className="text-red-500 text-sm">{errors.telefone.message}</p>
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
          <p className="text-red-500 text-sm">{errors.email.message}</p>
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
          <p className="text-red-500 text-sm">{errors.senha.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
