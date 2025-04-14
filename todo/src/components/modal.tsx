import { useEffect, useState } from 'react';
import { useHandleSubmit } from '../hooks/useHandleSubmit';
import { Button } from './button';
import { createTodo, editTodo } from '../services/todo';
import { Input } from './input';
import { Todo } from '../models/todo';

interface ModalProps {
  isOpen: boolean;
  todoEdit?: Todo | null;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const Modal = ({ isOpen, onClose, todoEdit }: ModalProps) => {
  const username = sessionStorage.getItem('username') || '';
  const [message, setMessage] = useState('');
  const [form, setForm] = useState<Todo>({
    username,
    titulo: '',
    descricao: '',
    status: false,
    importante: false,
  });

  useEffect(() => {
    if (todoEdit) {
      setForm({
        id: todoEdit.id,
        username,
        titulo: todoEdit.titulo,
        descricao: todoEdit.descricao,
        status: todoEdit.status,
        importante: todoEdit.importante,
      });
    } else {
      setForm({
        username,
        titulo: '',
        descricao: '',
        status: false,
        importante: false,
      });
    }
  }, [todoEdit, username]);

  const { handleSubmitTodo, status } = useHandleSubmit({
    isRegistering: !todoEdit,
    onRegister: createTodo,
    onUpdate: editTodo,
    todoEdit: todoEdit,
    onSuccess: () => {
      onClose();
      setForm({ username: username, titulo: '', descricao: '', status: false, importante: false });
    },
    onError: () => {
      setMessage('Falha ao cadastrar to do');
    },
  });

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-green-50 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✖
          </button>
          <h2 className="text-xl font-bold mb-4">{todoEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <form
            onSubmit={(e) => handleSubmitTodo(e, form, todoEdit?.id)}
            className="flex flex-col gap-3"
          >
            <Input
              name="titulo"
              form={form}
              setForm={setForm}
              placeholder="Título"
              className="border rounded p-2"
            />

            <Input
              name="descricao"
              form={form}
              setForm={setForm}
              placeholder="Descrição"
              type="textarea"
              className="border rounded p-2"
            />

            <Input
              name="importante"
              form={form}
              setForm={setForm}
              placeholder="Importante"
              type="checkbox"
              className="border rounded p-2"
            />
            <Button type="submit" className="bg-green-500 text-white">
              {todoEdit ? 'Salvar Alterações' : 'Salvar'}
            </Button>
          </form>
          {message && (
            <div className={`status-message ${status ? 'success' : 'error'}`}>{message}</div>
          )}
        </div>
      </div>
    )
  );
};
