import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { useRegistration } from "../hooks/useRegistration";
import { RegistrationForm } from "./RegistrationForm";

describe("RegistrationForm Component", () => {
  it("mostra erros de validação em tempo real", async () => {
    const user = userEvent.setup();
    // Criamos um wrapper que consome o hook real
    const TestComponent = () => {
      const { form } = useRegistration();
      return (
        <RegistrationForm
          form={form}
          onSubmit={jest.fn()}
          isSubmitting={false}
        />
      );
    };

    render(<TestComponent />);

    const nomeInput = screen.getByLabelText(/Nome completo/i);

    // No RHF, a validação asíncrona às vezes precisa de um "empurrão"
    await user.type(nomeInput, "João");
    await user.tab(); // Dispara o Blur

    // Use findBy para dar tempo ao estado do RHF atualizar o DOM
    expect(
      await screen.findByText(/Digite o nome completo/i),
    ).toBeInTheDocument();

    // CPF inválido
    await user.type(screen.getByLabelText(/CPF/i), "11111111111");
    await user.tab();

    const cpfError = await screen.findByText("CPF inválido");
    expect(cpfError).toBeInTheDocument();
  });

  it("aplica máscara corretamente durante a digitação", async () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useRegistration());

    render(
      <RegistrationForm
        form={result.current.form}
        onSubmit={jest.fn()}
        isSubmitting={false}
      />,
    );

    const cpfInput = screen.getByLabelText(/CPF/i);
    await user.type(cpfInput, "86614102079");
    expect(cpfInput).toHaveValue("866.141.020-79");

    const telefoneInput = screen.getByLabelText(/Telefone/i);
    await user.type(telefoneInput, "11987654321");
    expect(telefoneInput).toHaveValue("(11) 98765-4321");
  });

  it("submete formulário válido e chama onSubmit", async () => {
    const user = userEvent.setup();
    const onSubmitMock = jest.fn();

    const { result } = renderHook(() => useRegistration());

    render(
      <RegistrationForm
        form={result.current.form}
        onSubmit={onSubmitMock}
        isSubmitting={false}
      />,
    );

    const senha = "SenhaForte123@#!";

    await user.type(screen.getByLabelText(/Nome completo/i), "João Silva");
    await user.type(screen.getByLabelText(/CPF/i), "86614102079");
    await user.type(screen.getByLabelText(/Telefone/i), "11987654321");
    await user.type(screen.getByLabelText(/Email/i), "joao@teste.com");
    await user.type(screen.getByLabelText(/Senha/i), senha);
    await user.type(screen.getByLabelText(/Confirmar Senha/i), senha); // ← CORRIGIDO

    await user.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
  });

  it('desabilita botão e mostra "Cadastrando..." durante submit', async () => {
    const user = userEvent.setup();

    const { result } = renderHook(() => useRegistration());

    const TestWrapper = () => {
      const [isSubmitting, setIsSubmitting] = useState(false);
      const onSubmitMock = async () => {
        setIsSubmitting(true);
        await new Promise(() => {});
      };
      return (
        <RegistrationForm
          form={result.current.form}
          onSubmit={onSubmitMock}
          isSubmitting={isSubmitting}
        />
      );
    };

    render(<TestWrapper />);

    const senha = "SenhaForte123@#!";

    await user.type(screen.getByLabelText(/Nome completo/i), "João Silva");
    await user.type(screen.getByLabelText(/CPF/i), "86614102079");
    await user.type(screen.getByLabelText(/Telefone/i), "11987654321");
    await user.type(screen.getByLabelText(/Email/i), "joao@teste.com");
    await user.type(screen.getByLabelText(/Senha/i), senha);
    await user.type(screen.getByLabelText(/Confirmar Senha/i), senha);

    await user.click(screen.getByText("Cadastrar"));

    expect(screen.getByText("Cadastrando...")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cadastrando..." }),
    ).toBeDisabled();
  });
});
