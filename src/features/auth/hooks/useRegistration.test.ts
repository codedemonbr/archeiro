import { renderHook, act } from '@testing-library/react';
import { useRegistration } from './useRegistration';

describe('useRegistration Hook', () => {
  it('rejeita CPF inválido (repetido)', async () => {
    const { result } = renderHook(() => useRegistration());

    await act(async () => {
      result.current.form.setValue('cpf', '11111111111');
      await result.current.form.trigger('cpf');
    });

    expect(result.current.errors.cpf?.message).toBe('CPF inválido');
  });

  it('aceita CPF válido com máscara (transform funciona no submit)', async () => {
    const { result } = renderHook(() => useRegistration());

    await act(async () => {
      result.current.form.setValue('cpf', '866.141.020-79'); // valor com máscara (como o usuário digita)
      await result.current.form.trigger('cpf');
    });

    expect(result.current.errors.cpf).toBeUndefined(); // validação passou
    // Não checamos getValues aqui porque o transform só acontece no submit
  });

  it('rejeita nome incompleto', async () => {
    const { result } = renderHook(() => useRegistration());

    await act(async () => {
      result.current.form.setValue('nome', 'João');
      await result.current.form.trigger('nome');
    });

    expect(result.current.errors.nome?.message).toContain('nome completo');
  });

  it('rejeita senha fraca (sem maiúscula)', async () => {
    const { result } = renderHook(() => useRegistration());

    await act(async () => {
      result.current.form.setValue('senha', 'senhafraca123!');
      await result.current.form.trigger('senha');
    });

    expect(result.current.errors.senha?.message).toContain('maiúscula');
  });

  it('aceita todos os campos válidos (incluindo confirmarSenha)', async () => {
    const { result } = renderHook(() => useRegistration());

    const senhaValida = 'SenhaForte123#@!';

    await act(async () => {
      result.current.form.setValue('nome', 'João Silva');
      result.current.form.setValue('cpf', '86614102079');           // valor limpo (mais seguro)
      result.current.form.setValue('telefone', '11987654321');
      result.current.form.setValue('email', 'joao@teste.com');
      result.current.form.setValue('senha', senhaValida);
      result.current.form.setValue('confirmarSenha', senhaValida);  // ← campo novo!
      await result.current.form.trigger();
    });

    expect(Object.keys(result.current.errors)).toHaveLength(0);
  });
});