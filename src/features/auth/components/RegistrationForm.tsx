"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MaskedInput } from "@/components/ui/masked-input";
import { InputPassword } from "@/components/ui/password-input";
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
      {/* Nome */}
      <div className="grid gap-2">
        <Label htmlFor="nome">Nome completo</Label>
        <Input id="nome" {...register("nome")} placeholder="José da Silva" />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
        )}
      </div>

      {/* CPF com máscara */}
      <div className="grid gap-2">
        <Label htmlFor="cpf">CPF</Label>
        <MaskedInput
          mask="___.___.___-__"
          replacement={{ _: /\d/ }}
          {...register("cpf")}
          id="cpf"
          placeholder="000.000.000-00"
        />
        {errors.cpf && (
          <p className="text-red-500 text-sm">{errors.cpf.message}</p>
        )}
      </div>

      {/* Telefone com máscara */}
      <div className="grid gap-2">
        <Label htmlFor="telefone">Telefone</Label>
        <MaskedInput
          mask="(__) _____-____"
          replacement={{ _: /\d/ }}
          {...register("telefone")}
          id="telefone"
          placeholder="(11) 98765-4321"
        />
        {errors.telefone && (
          <p className="text-red-500 text-sm">{errors.telefone.message}</p>
        )}
      </div>

      {/* Email */}
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

      {/* Senha */}
      <div className="grid gap-2">
        <Label htmlFor="senha">Senha</Label>

        <InputPassword name="senha" register={register} />
        {errors.senha && (
          <p className="text-red-500 text-sm">{errors.senha.message}</p>
        )}
      </div>

      {/* Confirmar Senha */}
      <div className="grid gap-2">
        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
        <Input
          id="confirmarSenha"
          type="password"
          {...register("confirmarSenha")}
          placeholder="••••••••"
        />
        {errors.confirmarSenha && (
          <p className="text-red-500 text-sm">
            {errors.confirmarSenha.message}
          </p>
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
