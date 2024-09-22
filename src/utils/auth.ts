const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw await response.json();
  return response.json();
};

export const signupUser = async (userData: { username: string; email: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw await response.json();
  return response.json();
};