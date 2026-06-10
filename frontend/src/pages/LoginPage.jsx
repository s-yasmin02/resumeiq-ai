import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Update AuthContext (which also handles localStorage persistence)
      login(response.data.user, response.data.token);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-73px)] p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Welcome Back</h2>
        
        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center animate-pulse">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-[#0B1120]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#0B1120]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400">
              <input type="checkbox" className="mr-2 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500" /> Remember me
            </label>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Forgot Password?</a>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 mt-4">
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account? <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
