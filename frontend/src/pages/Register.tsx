import React, { useState } from 'react';
import { Button, Input } from '../components/ui';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/register', { username, password });
      window.location.href = '/login';
    } catch (error: unknown) {
      setError(error.response.data.detail);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Register</h2>
        <Input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </div>
  );
};

export default Register;