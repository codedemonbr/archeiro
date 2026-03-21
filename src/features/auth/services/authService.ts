import type { RegistrationData } from "@/types/auth";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export const authService = {
  async registerUser(data: RegistrationData) {
    const payload = {
      nome: data.nome.trim(),
      cpf: data.cpf,
      telefone: data.telefone,
      email: data.email.trim().toLowerCase(),
      senha: data.senha,
    };

    const response = await axios.post(`${API_URL}/auth/users`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  },
};
