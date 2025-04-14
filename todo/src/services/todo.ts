import api from '../config/apiConfig';
import { Todo } from '../models/todo';

interface TodoRequest {
  username?: string;
  titulo: string;
  descricao: string;
  status: boolean;
  importante: boolean;
}

export const createTodo = async (data: TodoRequest): Promise<Todo | null> => {
  return await api
    .post<Todo>('todos/create', data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error('Erro ao criar to do:', error);
      throw error;
    });
};

export const editTodo = async (data: Todo): Promise<Todo | null> => {
  return await api
    .put<Todo>('todos/edit', data)
    .then((res) => {
      console.log('Editando api: ', res);
      return res.data;
    })
    .catch((error) => {
      console.log('erro api: ', error);
      console.error('Erro ao editar to do:', error);
      throw error;
    });
};

interface TodoResponse {
  todos: Todo[];
}

export const deleteTodos = async (id: string): Promise<boolean> => {
  return await api
    .delete(`todos/${id}`)
    .then((res) => {
      if (res) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error('Erro ao encontrar to do:', error);
      throw error;
    });
};

export const allTodos = async (): Promise<Todo[]> => {
  const username = sessionStorage.getItem('username') || '';
  return await api
    .get<TodoResponse>(`todos/${username.replace(/ /g, '%20')}`)
    .then((res) => {
      return res.data.todos;
    })
    .catch((error) => {
      console.error('Erro ao encontrar to do:', error);
      throw error;
    });
};
