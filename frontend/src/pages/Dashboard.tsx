import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from '../components/ui';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/api/todos', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setTodos(response.data);
      } catch (error: unknown) {
        setError(error.response.data.detail);
      }
    };
    fetchTodos();
  }, []);

  const handleCreateTodo = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/todos', { title: newTodo }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error: unknown) {
      setError(error.response.data.detail);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Todos</h2>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Input label="New Todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <Button onClick={handleCreateTodo}>Create Todo</Button>
        <ul className="list-none mt-4">
          {todos.map((todo) => (
            <li key={todo.id} className="py-2 border-b border-gray-200">
              <span className="text-gray-900">{todo.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;