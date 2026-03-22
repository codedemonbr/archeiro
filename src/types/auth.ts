export interface RegistrationData {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export type RegistrationForm = RegistrationData;
