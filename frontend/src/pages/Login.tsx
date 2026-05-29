import React, { useState } from 'react';
import { Button, Input } from '../components/ui';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/login', { username, password });
      localStorage.setItem('token', response.data.access_token);
      window.location.href = '/dashboard';
    } catch (error: unknown) {
      setError(error.response.data.detail);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Login</h2>
        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Login;