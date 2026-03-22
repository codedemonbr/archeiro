"use client"; // só se precisar de window/localStorage no futuro (request interceptor)

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 15000, // 15 segundos – ajuste conforme necessário
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // ────────────────────────────────────────────────
  // Request Interceptor
  // ────────────────────────────────────────────────
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Aqui você pode adicionar token de autenticação, locale, etc.
      // Exemplo futuro: token de auth
      // if (typeof window !== 'undefined') {
      //   const token = localStorage.getItem('accessToken');
      //   if (token) {
      //     config.headers!.Authorization = `Bearer ${token}`;
      //   }
      // }

      // Exemplo: adicionar header de idioma (para internacionalização futura)
      // config.headers!['Accept-Language'] = navigator.language || 'pt-BR';
      ``;
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );

      return config;
    },
    (error) => {
      console.error("[API Request Error]", error);
      return Promise.reject(error);
    },
  );

  // ────────────────────────────────────────────────
  // Response Interceptor
  // ────────────────────────────────────────────────
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log de sucesso (opcional – remova em prod se quiser)
      console.log(
        `[API Success] ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`,
      );

      return response;
    },
    (
      error: AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
      }>,
    ) => {
      const status = error.response?.status;
      let message = "Ocorreu um erro inesperado. Tente novamente.";

      if (status === 400) {
        // Erros de validação do backend
        const backendErrors = error.response?.data?.errors;
        if (backendErrors) {
          // Pode transformar em objeto para mostrar por campo no form
          message =
            Object.values(backendErrors).flat().join(", ") ||
            "Dados inválidos.";
        } else {
          message = error.response?.data?.message || "Requisição inválida.";
        }
      } else if (status === 401) {
        message = "Sessão expirada. Faça login novamente.";
        // Aqui no futuro: logout automático + redirect
        // authStore.logout();
        // window.location.href = '/login';
      } else if (status === 403) {
        message = "Você não tem permissão para esta ação.";
      } else if (status === 404) {
        message = "Recurso não encontrado.";
      } else if (status === 500 || status === 502 || status === 503) {
        message = "Erro no servidor. Tente novamente mais tarde.";
      } else if (error.code === "ECONNABORTED") {
        message = "Tempo de requisição esgotado.";
      } else if (!error.response) {
        message = "Sem conexão com o servidor. Verifique sua internet.";
      }

      console.error("[API Response Error]", {
        status,
        url: error.config?.url,
        method: error.config?.method,
        message: error.message,
        responseData: error.response?.data,
      });

      // Transforma o erro para ser mais amigável no hook/use-case
      return Promise.reject({
        ...error,
        userFriendlyMessage: message,
        status,
        isNetworkError: !error.response,
      });
    },
  );

  return instance;
};

// Singleton – garante apenas uma instância
let apiClientInstance: AxiosInstance | null = null;

export const getApiClient = (): AxiosInstance => {
  if (!apiClientInstance) {
    apiClientInstance = createApiClient();
  }
  return apiClientInstance;
};
