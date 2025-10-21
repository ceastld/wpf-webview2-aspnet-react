import { List, Typography } from '@mui/material';
import TodoListItem from './TodoListItem';
import { useTodo } from '../contexts/TodoContext';

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodo();
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <Typography variant="h6" className="text-gray-500 mb-2">
          No todos yet
        </Typography>
        <Typography variant="body2" className="text-gray-400">
          Add your first todo above to get started!
        </Typography>
      </div>
    );
  }

  return (
    <List className="space-y-2">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </List>
  );
}
