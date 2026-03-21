"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RegistrationForm } from "@/types/auth";
import { InputMask } from "@react-input/mask";
import { Controller, type UseFormReturn } from "react-hook-form";

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
    control,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Nome (sem máscara) */}
      <div className="grid gap-2">
        <Label htmlFor="nome">Nome completo</Label>
        <Input
          id="nome"
          {...form.register("nome")}
          placeholder="José da Silva"
        />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
        )}
      </div>

      {/* CPF com máscara */}
      <div className="grid gap-2">
        <Label htmlFor="cpf">CPF</Label>
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <InputMask
              mask="999.999.999-99"
              value={field.value}
              onChange={field.onChange}
            ></InputMask>
          )}
        />
        {errors.cpf && (
          <p className="text-red-500 text-sm">{errors.cpf.message}</p>
        )}
      </div>

      {/* Telefone com máscara */}
      <div className="grid gap-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <InputMask
              mask="(99) 99999-9999"
              value={field.value}
              onChange={field.onChange}
            ></InputMask>
          )}
        />
        {errors.telefone && (
          <p className="text-red-500 text-sm">{errors.telefone.message}</p>
        )}
      </div>

      {/* Email e Senha (sem máscara) */}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
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
          {...form.register("senha")}
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
