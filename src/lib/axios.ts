import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api", // ajuste no .env.local
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptores (futuro-proof)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
