import type { RegistrationData } from "@/types/auth";
import { getApiClient } from "../lib/api/apiClient";

export const authService = {
  async registerUser(data: RegistrationData) {
    const payload = {
      nome: data.nome.trim(),
      cpf: data.cpf,
      telefone: data.telefone,
      email: data.email.trim().toLowerCase(),
      senha: data.senha,
    };

    // Usa a instância com interceptors
    const api = getApiClient();

    const response = await api.post("/auth/users", payload);

    return response.data;
  },

  // Futuro: adicione mais métodos aqui
  // async login(credentials: LoginData) { ... }
};
