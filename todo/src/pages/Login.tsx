import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, CreateUser } from '../services/auth';
import { LoginData } from '../models/loginData';
import { useHandleSubmit } from '../hooks/usehandleSubmit';
import { Input } from '../components/input';
import { Button } from '../components/button';

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginData>({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const { handleSubmitLogin, status } = useHandleSubmit<LoginData>({
    isRegistering,
    onRegister: CreateUser,
    onAuth: Auth,
    onSuccess: () => {
      if (!isRegistering) {
        navigate('/dashboard');
      } else {
        setMessage('Usuário criado com sucesso');
      }
    },
    onError: () => {
      if (isRegistering) {
        setMessage('Cadastro falhou. Por favor, tente novamente.');
      } else {
        setMessage('Usuário ou senha inválidos');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <form
        onSubmit={(e) => handleSubmitLogin(e, form)}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-10 border border-green-100 relative overflow-hidden"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {isRegistering ? 'Crie sua conta' : 'Bem-vindo a Todo List'}
        </h2>

        {message && (
          <p
            className={`text-sm mb-4 text-center ${
              status === false ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {message}
          </p>
        )}

        <Input<LoginData>
          name="username"
          form={form}
          setForm={setForm}
          placeholder="Usuário"
          className="w-full mb-4 p-3 text-black border border-green-200 rounded-xl bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <Input<LoginData>
          name="password"
          type="password"
          form={form}
          setForm={setForm}
          placeholder="Senha"
          className="w-full mb-6 p-3 text-black border border-green-200 rounded-xl bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="w-full mb-4">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMessage('');
            }}
            className={`text-green-600 hover:underline text-sm transition-all ${
              !isRegistering && message ? 'animate-shake' : ''
            }`}
          >
            {isRegistering
              ? 'Já tem conta? Login'
              : 'Novo aqui? Criar uma conta'}
          </button>
        </div>
        <Button type="submit">{isRegistering ? 'Cadastrar' : 'Entrar'}</Button>
      </form>
    </div>
  );
};
