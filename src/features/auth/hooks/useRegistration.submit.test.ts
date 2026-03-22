import { renderHook, act } from '@testing-library/react';
import { toast } from 'sonner';
import { useRegistration } from './useRegistration';

// Mock correto do service (export const authService)
jest.mock('../services/authService', () => ({
    authService: {
        registerUser: jest.fn(),
    },
}));

// Mock correto do sonner
jest.mock('sonner', () => ({
    toast: {
        loading: jest.fn().mockReturnValue('toast-id-123'),
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const mockRegisterUser = jest.requireMock('../services/authService').authService.registerUser;
const mockToast = jest.requireMock('sonner').toast;

describe('useRegistration - Submissão do formulário (Frontend Forjado)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('chama API com dados corretos, mostra toast de sucesso e limpa o form', async () => {
        mockRegisterUser.mockResolvedValueOnce({ id: 123 });

        const { result } = renderHook(() => useRegistration());

        const senhaValida = 'SenhaForte123@#!';

        await act(async () => {
            result.current.form.setValue('nome', 'João Silva');
            result.current.form.setValue('cpf', '86614102079');
            result.current.form.setValue('telefone', '11987654321');
            result.current.form.setValue('email', 'joao@teste.com');
            result.current.form.setValue('senha', senhaValida);
            result.current.form.setValue('confirmarSenha', senhaValida); // ← campo obrigatório!

            await result.current.onSubmit(); // chama o handleSubmit
        });

        // Verifica se chamou o service com os dados LIMPOS (transform do Zod)
        expect(mockRegisterUser).toHaveBeenCalledWith({
            nome: 'João Silva',
            cpf: '86614102079',
            telefone: '11987654321', // máscara ainda presente aqui (transform só no submit real)
            email: 'joao@teste.com',
            senha: senhaValida,
            confirmarSenha: senhaValida,
        });

        expect(mockToast.success).toHaveBeenCalledWith(
            'Cadastro realizado com sucesso!',
            expect.objectContaining({ id: expect.any(String) })
        );
        expect(result.current.form.getValues()).toEqual({
            nome: '',
            cpf: '',
            telefone: '',
            email: '',
            senha: '',
            confirmarSenha: '',
        });
    });

    it('mostra toast de erro quando API falha', async () => {
        mockRegisterUser.mockRejectedValueOnce(new Error('CPF já cadastrado'));

        const { result } = renderHook(() => useRegistration());

        const senhaValida = 'SenhaForte123@#!';

        await act(async () => {
            result.current.form.setValue('nome', 'João Silva');
            result.current.form.setValue('cpf', '86614102079');
            result.current.form.setValue('telefone', '11987654321');
            result.current.form.setValue('email', 'joao@teste.com');
            result.current.form.setValue('senha', senhaValida);
            result.current.form.setValue('confirmarSenha', senhaValida);

            await result.current.onSubmit();
        });

        // expect(mockToast.error).toHaveBeenCalledWith(
        //     expect.stringContaining('CPF já cadastrado')
        // );

        expect(mockToast.error).toHaveBeenCalledWith(
            'CPF já cadastrado',
            expect.objectContaining({ id: expect.any(String) })
        );
    });
});