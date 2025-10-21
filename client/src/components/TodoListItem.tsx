import { ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon, CheckCircle as CheckIcon, RadioButtonUnchecked as UncheckIcon } from '@mui/icons-material';

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface TodoListItemProps {
  todo: TodoItem;
  onToggle: (id: number, isCompleted: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoListItem({ todo, onToggle, onDelete }: TodoListItemProps) {
  return (
    <ListItem
      className={`mb-3 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all duration-200 ${
        todo.isCompleted ? 'opacity-75 bg-gray-50' : ''
      }`}
      secondaryAction={
        <div className="flex gap-2">
          <IconButton
            onClick={() => onToggle(todo.id, todo.isCompleted)}
            className={`${
              todo.isCompleted
                ? 'text-green-500 hover:bg-green-50'
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {todo.isCompleted ? <CheckIcon /> : <UncheckIcon />}
          </IconButton>
          <IconButton
            onClick={() => onDelete(todo.id)}
            className="text-red-400 hover:bg-red-50"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      }
    >
      <ListItemText
        primary={
          <Typography
            variant="body1"
            className={`font-medium ${
              todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </Typography>
        }
        secondary={
          <Typography variant="body2" className="text-gray-400">
            {todo.isCompleted ? 'Completed' : 'Pending'}
          </Typography>
        }
      />
    </ListItem>
  );
}
