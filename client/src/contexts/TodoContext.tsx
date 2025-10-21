import { type ReactNode, useState, useEffect, createContext, useContext } from "react";
import { produce } from 'immer';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils/api';

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface ITodoContext {
  todos: TodoItem[];
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number, isCompleted: boolean) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  fetchTodos: () => Promise<void>;
}

export const TodoContext = createContext<ITodoContext | null>(null);

export const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const fetchTodos = async () => {
    try {
      const data = await apiGet<TodoItem[]>('/api/todo');
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async (title: string) => {
    if (!title.trim()) return;
    try {
      const newTodo = await apiPost<TodoItem>('/api/todo', { title });
      setTodos(produce(draft => {
        draft.push(newTodo);
      }));
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleTodo = async (id: number, isCompleted: boolean) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      await apiPut<TodoItem>(`/api/todo/${id}`, {
        title: todo.title,
        isCompleted: !isCompleted,
      });
      
      setTodos(produce(draft => {
        const todo = draft.find(t => t.id === id);
        if (todo) {
          todo.isCompleted = !isCompleted;
        }
      }));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await apiDelete(`/api/todo/${id}`);
      setTodos(produce(draft => {
        const index = draft.findIndex(t => t.id === id);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      }));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoContextProvider');
  }
  return context;
}