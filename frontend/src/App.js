import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const API_BASE_URL = '/api/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    // Log message when form is submitted (Enter pressed)
    console.log('📝 Form submitted via Enter key - Adding todo:', newTodo);
    
    try {
      await axios.post(API_BASE_URL, { text: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Handle input changes and log them
  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('⌨️ Text input changed:', value);
    setNewTodo(value);
  };

  // Handle key press events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('↵ Enter key pressed - Current input:', newTodo);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(`${API_BASE_URL}/${id}`, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              onClick={() => toggleComplete(todo._id, todo.completed)}
              style={{ marginLeft: '10px' }}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
