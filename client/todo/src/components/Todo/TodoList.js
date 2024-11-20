import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTodos = async () => {
      try {
        const res = await api.get('/todos');
        setTodos(res.data);
      } catch (err) {
        console.error('Error fetching todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [token, navigate]);

  const addTodo = async (todo) => {
    try {
      const res = await api.post('/todos', { title: todo });
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const res = await api.put(`/todos/${id}`, {
        completed: !todo.completed
      });
      setTodos(todos.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="todo-list">
      <h2>My Todo List</h2>
      <AddTodo onAdd={addTodo} />
      <div className="todos">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
