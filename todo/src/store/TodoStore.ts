import { create } from 'zustand';
import { Todo } from '../models/todo';

type TodoStore = {
  todos: Todo[];
  addToTodos: (item: Todo) => void;
};

export const useTodoStore = create<TodoStore>((set) => {
  return {
    todos: [],
    addToTodos: (item) => set((state) => ({ todos: [...state.todos, item] })),
  };
});
