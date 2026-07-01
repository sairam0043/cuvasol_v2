import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { Mail, Lock, Brain, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await login(email, password);
      // Determine redirection based on role
      // We read the token / trigger state reload
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      const mockGoogleId = 'g_' + Math.random().toString(36).substring(2, 11);
      await loginWithGoogle(
        mockGoogleId,
        'alex.google@gmail.com',
        'Alex Google Student',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexGoogle'
      );
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Google Auth failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-650/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative z-10">
        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-2 bg-brand-primary/10 rounded-xl border border-brand-primary/20 mb-2">
            <Brain className="h-6 w-6 text-brand-primary" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">Sign In to Cuvasol</h2>
          <p className="text-zinc-550 text-xs">Enter credentials to resume your placement runway.</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-zinc-400 font-medium">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                required
                className="w-full bg-zinc-900 border border-zinc-850 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-zinc-400 font-medium">Password</label>
              <a href="#" className="text-[10px] text-indigo-400 hover:text-indigo-300">Forgot?</a>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-zinc-900 border border-zinc-850 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/10 transition-colors cursor-pointer text-center flex justify-center items-center space-x-1.5 disabled:opacity-55"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            {!loading && <ArrowRight className="h-4.5 w-4.5" />}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-zinc-900"></div>
          <span className="flex-shrink mx-4 text-zinc-550 text-[10px] uppercase font-semibold">Or continue with</span>
          <div className="flex-grow border-t border-zinc-900"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-white font-medium text-xs transition-colors cursor-pointer text-center flex justify-center items-center space-x-2"
        >
          {/* Custom Google logo */}
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google Accounts</span>
        </button>

        <div className="text-center text-[10px] text-zinc-550">
          <span>New to the runway? </span>
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">Create an account</Link>
        </div>
      </div>
    </div>
  );
};
