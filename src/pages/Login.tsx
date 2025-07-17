import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../lib/auth';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Clear fields on mount
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res.token) {
        sessionStorage.setItem('token', res.token);
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(res.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h2 className="text-3xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          autoComplete="off" // 🔐 prevent autofill
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-2 rounded text-black"
        />
        <input
          autoComplete="new-password" // 🔐 disable password autofill
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 w-full"
        >
          Log In
        </button>
      </form>

      <p className="mt-4">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-blue-400 underline hover:text-blue-500">
          Sign up here
        </Link>
      </p>
    </div>
  );
}

export default Login;
