using Microsoft.AspNetCore.Mvc;

namespace TodoApp.Api.Controllers
{
    /// <summary>
    /// Todo items management controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private static readonly List<TodoItem> _todos =
        [
            new TodoItem { Id = 1, Title = "Learn WPF", IsCompleted = false },
            new TodoItem { Id = 2, Title = "Learn WebView2", IsCompleted = true },
            new TodoItem { Id = 3, Title = "Build hybrid app", IsCompleted = false }
        ];

        /// <summary>
        /// Get all todo items
        /// </summary>
        /// <returns>List of todo items</returns>
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetTodos()
        {
            return Ok(_todos);
        }

        /// <summary>
        /// Get a specific todo item by ID
        /// </summary>
        /// <param name="id">Todo item ID</param>
        /// <returns>Todo item</returns>
        [HttpGet("{id}")]
        public ActionResult<TodoItem> GetTodo(int id)
        {
            var todo = _todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
                return NotFound();
            
            return Ok(todo);
        }

        /// <summary>
        /// Create a new todo item
        /// </summary>
        /// <param name="todo">Todo item to create</param>
        /// <returns>Created todo item</returns>
        [HttpPost]
        public ActionResult<TodoItem> CreateTodo([FromBody] CreateTodoRequest request)
        {
            var newTodo = new TodoItem
            {
                Id = _todos.Count > 0 ? _todos.Max(t => t.Id) + 1 : 1,
                Title = request.Title,
                IsCompleted = false
            };
            
            _todos.Add(newTodo);
            return CreatedAtAction(nameof(GetTodo), new { id = newTodo.Id }, newTodo);
        }

        /// <summary>
        /// Update a todo item
        /// </summary>
        /// <param name="id">Todo item ID</param>
        /// <param name="request">Update request</param>
        /// <returns>Updated todo item</returns>
        [HttpPut("{id}")]
        public ActionResult<TodoItem> UpdateTodo(int id, [FromBody] UpdateTodoRequest request)
        {
            var todo = _todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
                return NotFound();

            todo.Title = request.Title;
            todo.IsCompleted = request.IsCompleted;
            
            return Ok(todo);
        }

        /// <summary>
        /// Delete a todo item
        /// </summary>
        /// <param name="id">Todo item ID</param>
        /// <returns>No content</returns>
        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var todo = _todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
                return NotFound();

            _todos.Remove(todo);
            return NoContent();
        }
    }

    /// <summary>
    /// Todo item model
    /// </summary>
    public class TodoItem
    {
        /// <summary>
        /// Unique identifier
        /// </summary>
        public int Id { get; set; }
        
        /// <summary>
        /// Todo item title
        /// </summary>
        public string Title { get; set; } = string.Empty;
        
        /// <summary>
        /// Completion status
        /// </summary>
        public bool IsCompleted { get; set; }
    }

    /// <summary>
    /// Create todo request model
    /// </summary>
    public class CreateTodoRequest
    {
        /// <summary>
        /// Todo item title
        /// </summary>
        public string Title { get; set; } = string.Empty;
    }

    /// <summary>
    /// Update todo request model
    /// </summary>
    public class UpdateTodoRequest
    {
        /// <summary>
        /// Todo item title
        /// </summary>
        public string Title { get; set; } = string.Empty;
        
        /// <summary>
        /// Completion status
        /// </summary>
        public bool IsCompleted { get; set; }
    }
}
