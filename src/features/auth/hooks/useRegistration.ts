"use client";

import type { RegistrationForm } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { authService } from "../services/authService";

// ────────────────────────────────────────────────
// Schema Zod com .transform (para aceitar valor formatado)
// ────────────────────────────────────────────────
const registrationSchema = z.object({
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
    .transform((val) => val.replace(/\D/g, "")) // limpa máscara antes da validação
    .pipe(
      z
        .string()
        .length(11, "CPF deve ter exatamente 11 dígitos")
        .regex(/^\d{11}$/, "CPF deve conter apenas números")
        .refine((val) => {
          if (/^(\d)\1{10}$/.test(val)) return false;
          // algoritmo CPF oficial (mantido)
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
    ),

  telefone: z
    .string()
    .transform((val) => val.replace(/\D/g, "")) // limpa máscara
    .pipe(
      z
        .string()
        .min(10, "Telefone inválido")
        .max(11, "Telefone inválido")
        .regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
    ),

  email: z.string().email("Email inválido").toLowerCase(),

  senha: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Pelo menos 1 maiúscula")
    .regex(/[a-z]/, "Pelo menos 1 minúscula")
    .regex(/\d/, "Pelo menos 1 número")
    .regex(/[@$!%*?&]/, "Pelo menos 1 caractere especial"),
});

export function useRegistration() {
  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: RegistrationForm) => {
    const toastId = toast.loading("Cadastrando usuário...");

    try {
      await authService.registerUser(data); // cpf e telefone já vêm limpos graças ao .transform
      toast.success("Cadastro realizado com sucesso!", { id: toastId });
      form.reset();
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Erro ao cadastrar.";
      toast.error(message, { id: toastId });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
  };
}
