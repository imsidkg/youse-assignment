'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface SignupResponse {
  token: string;
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('https://youse-backend.netlify.app/.netlify/functions/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Signup error:', errorData);
        throw new Error(errorData.message || 'Signup failed');
      }
  
      const data: SignupResponse = await response.json();
      localStorage.setItem('token', data.token);
      console.log('Signed up successfully', data.token);
      router.push('/login')
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Signup</h1>
    {error && <p className="text-red-500">{error}</p>}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full text-black"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Signup</button>
    </form>
  </div>
  );
};

export default Signup;
