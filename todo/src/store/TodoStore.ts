import { create } from 'zustand';
import { Todo } from '../models/todo';

type TodoStore = {
  todos: Todo[];
  addToTodos: (item: Todo) => void;
  addManyTodos: (items: Todo[]) => void;
  updateTodo: (item: Todo) => void;
};

export const useTodoStore = create<TodoStore>((set) => {
  return {
    todos: [],
    addToTodos: (item) => set((state) => ({ todos: [...state.todos, item] })),
    addManyTodos: (items: Todo[]) => set(() => ({ todos: items })),
    updateTodo: (updatedTodo: Todo) =>
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      })),
  };
});
