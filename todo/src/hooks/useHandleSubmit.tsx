import { useState } from 'react';
import { useTodoStore } from '../store/TodoStore';
import { Todo } from '../models/todo';
import { deleteTodos, editTodo } from '../services/todo';

type UseHandleSubmitParams<T> = {
  isRegistering: boolean;
  onRegister?: (form: T) => Promise<any>;
  onUpdate?: (form: T) => Promise<any>;
  onAuth?: (form: T) => Promise<any>;
  todoEdit?: Todo | null;
  onSuccess?: () => void;
  onError?: (err: any) => void;
};

export const useHandleSubmit = <T extends Record<string, any>>({
  isRegistering,
  onRegister,
  onAuth,
  onSuccess,
  onError,
  onUpdate,
}: UseHandleSubmitParams<T>) => {
  const [status, setStatus] = useState<boolean | null>(null);
  const { addToTodos, updateTodo, addManyTodos, todos } = useTodoStore();
  const username = sessionStorage.getItem('username') || '';

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>, form: T) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (onRegister) {
          const created = await onRegister(form);
          if (created) {
            setStatus(true);
            onSuccess?.();
          } else {
            setStatus(false);
          }
        } else {
          console.warn('onRegister não foi fornecido!');
        }
      } else {
        if (onAuth) {
          await onAuth(form);
          setStatus(true);
          onSuccess?.();
        } else {
          console.warn('onAuth não foi fornecido!');
        }
      }
    } catch (err) {
      setStatus(false);
      onError?.(err);
    }
  };

  const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>, form: T, id?: string) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        if (onRegister) {
          const created = await onRegister(form);
          if (created && created.todo) {
            setStatus(true);
            onSuccess?.();
            addToTodos(created.todo);
            setStatus(false);
          }
        } else {
          console.warn('onRegister não foi fornecido!');
        }
      } else if (id && onUpdate) {
        const edited = await onUpdate(form);
        setStatus(true);
        onSuccess?.();
        updateTodo(edited.todo);
      } else {
        console.warn('onUpdate não foi fornecido!');
      }
    } catch (error) {
      setStatus(false);
      onError?.(error);
    }
  };

  const handleUpdateTodoField = async (todo: Todo, field: keyof Todo, value: any) => {
    try {
      const edited = { ...todo, [field]: value };
      delete edited.createdAt;
      delete edited.updatedAt;
      edited.username = username;
      const updated = await editTodo(edited);
      if (updated) {
        updateTodo(updated);
      }
    } catch (error) {
      console.error(`Erro ao atualizar campo "${field}":`, error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const message = await deleteTodos(id);
      if (message) {
        addManyTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  return { handleSubmitLogin, handleSubmitTodo, handleUpdateTodoField, handleDeleteTodo, status };
};
