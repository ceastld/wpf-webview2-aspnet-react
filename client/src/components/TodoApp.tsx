import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Chip,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TodoList from './TodoList';
import { useTodo } from '../contexts/TodoContext';

export default function TodoApp() {
  const { todos, addTodo } = useTodo();
  const [newTodo, setNewTodo] = useState<string>('');

  // 添加待办事项
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    
    await addTodo(newTodo);
    setNewTodo('');
  };

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* App Bar with Tailwind styling */}
      <AppBar
        position="static"
        className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
      >
        <Toolbar className="justify-between">
          <Typography variant="h6" className="font-bold">
            Todo App
          </Typography>
          <Chip
            label={`${completedCount}/${totalCount} completed`}
            className="bg-white/20 text-white"
          />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Add Todo Card */}
        <Card className="mb-8 shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <Typography variant="h5" className="mb-6 text-gray-800 font-semibold">
              Add New Todo
            </Typography>

            <div className="flex gap-4">
              <TextField
                label="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                className="flex-1"
                slotProps={{
                  root: {
                    className: "bg-white rounded-xl"
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddTodo}
                disabled={!newTodo.trim()}
                startIcon={<AddIcon />}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <Card className="shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <Typography variant="h5" className="mb-6 text-gray-800 font-semibold">
              Your Todos
            </Typography>

            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
