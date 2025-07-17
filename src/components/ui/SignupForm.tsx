import React, { useState } from 'react';
import { signup } from 'src/lib/auth';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signup(email, password);
    alert(res.message || res.error);
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
