// src/pages/Signup.tsx
import React, { useState } from 'react';
import { signup } from '../lib/auth';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signup(email, password);
    if (res.token) {
      sessionStorage.setItem('token', res.token); // 🔄 Changed from localStorage
      toast.success('Signup successful!');
      navigate('/');
    } else {
      toast.error(res.message || res.error || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <form onSubmit={handleSignup} className="flex flex-col items-center gap-4 p-4 bg-slate-900 rounded-md shadow-md w-80">
        <h2 className="text-2xl font-bold">Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-2 rounded w-full bg-slate-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-2 rounded w-full bg-slate-800 text-white"
        />
        <button
          type="submit"
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 w-full"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 underline hover:text-blue-500">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
