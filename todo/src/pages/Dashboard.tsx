import '../App.css';
import { useTodoStore } from '../store/TodoStore';
import { Button } from '../components/button';
import { Modal } from '../components/modal';
import { useEffect, useState } from 'react';
import { allTodos } from '../services/todo';
import { Todo } from '../models/todo';
import { formatDate } from '../utils/formatDate';
import { useHandleSubmit } from '../hooks/useHandleSubmit';

export const Dashboard = () => {
  const { todos, addManyTodos } = useTodoStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const { handleUpdateTodoField, handleDeleteTodo } = useHandleSubmit<Todo>({
    isRegistering: false,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await allTodos();
        addManyTodos(todos);
      } catch (error) {
        console.error('Erro ao carregar todos:', error);
      }
    };
    fetchTodos();
  }, [todos]);

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col justify-center items-center font-sans text-gray-500">
      <h1 className="text-3xl font-bold mb-6 text-center">📋 Lista de Tarefas</h1>
      <Button
        type="submit"
        onClick={() => setModalOpen(!modalOpen)}
        className="w-28 mb-4 h-10 bg-green-100"
      >
        {'Adicionar'}
      </Button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => console.log('Tarefa salva com sucesso!')}
        onError={() => console.error('Erro ao salvar a tarefa:')}
        todoEdit={todoToEdit}
      />

      {todos.length === 0 ? (
        <p className="text-center text-gray-500 mb-4">Nenhuma tarefa cadastrada ainda.</p>
      ) : (
        <div className="flex-grow overflow-y-auto space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`border rounded-xl p-6 shadow-md transition-all ${
                todo.status ? 'bg-green-50' : 'bg-white'
              }`}
            >
              <h2 className="text-2xl font-semibold text-gray-800">{todo.titulo}</h2>
              <div className="flex items-center justify-between p-8 m-2 space-x4">
                <Button
                  onClick={() => handleUpdateTodoField(todo, 'importante', !todo.importante)}
                  type="submit"
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    todo.importante ? 'bg-red-200' : 'bg-gray-200'
                  }`}
                >
                  {todo.importante ? '★ Importante' : '☆ Importante'}
                </Button>

                <Button
                  type="submit"
                  onClick={() => handleUpdateTodoField(todo, 'status', !todo.status)}
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    todo.status ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {todo.status ? 'Concluído' : '⏳ Pendente'}
                </Button>
              </div>

              <p className="text-gray-600 mb-3 text-sm">{todo.descricao}</p>

              <div className="text-xs text-gray-500">
                <p>Criado em: {formatDate(todo.createdAt)}</p>
                <p>Atualizado em: {formatDate(todo.updatedAt)}</p>
              </div>
              <Button
                onClick={() => {
                  setTodoToEdit(todo), setModalOpen(true);
                }}
                type="submit"
                className="w-24 bg-green-100 mt-3 h-8 text-xs"
              >
                {'Editar'}
              </Button>
              <Button
                onClick={() => (todo.id ? handleDeleteTodo(todo.id) : null)}
                type="button"
                className="w-24 bg-red-100 mt-3 h-8 text-xs text-red-700 flex justify-center items-center"
              >
                🗑️ Excluir
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
