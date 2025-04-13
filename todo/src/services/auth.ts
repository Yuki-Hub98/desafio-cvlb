import api from '../config/apiConfig';
import { setToken, setUsername } from '../config/authConfig';
import { LoginData } from '../models/loginData';

export const Auth = async ({ username, password }: LoginData) => {
  return await api
    .post('auth/login', { username, password })
    .then((res) => {
      if (res.status === 200) {
        const { token, username: user } = res.data;
        setToken(token);
        setUsername(user);
        return res.data;
      } else {
        throw new Error('Falha no login');
      }
    })
    .catch((error) => {
      console.error('Erro ao realizar login:', error);
      throw error;
    });
};

export const CreateUser = async ({ username, password }: LoginData) => {
  return await api
    .post('auth/register', { username, password })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error('Falha ao criar o usuário');
      }
    })
    .catch((error) => {
      console.error('Erro ao realizar login:', error);
      throw error;
    });
};
