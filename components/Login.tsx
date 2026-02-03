
import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, ShieldCheck, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLogin: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        username,
        password
      });
      onLogin(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao conectar ao servidor.');
      setLoading(false);
    }
  };

  const handleDevLogin = async () => {
    setUsername('admin');
    setPassword('devpassword123');
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        username: 'admin',
        password: 'devpassword123'
      });
      onLogin(response.data);
    } catch (err: any) {
      setError('Erro no login dev automático.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-10 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6 group cursor-pointer overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-indigo-500 opacity-100 group-hover:scale-110 transition-transform duration-500"></div>
            <ShieldCheck className="w-8 h-8 text-white relative z-10" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">CertSync CRM</h1>
          <p className="text-slate-400 mt-2 text-center">Gestão Profissional de Certificação Digital</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Usuário</label>
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="nome.usuario" 
                className="w-full bg-slate-800/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-300">Senha</label>
              <button type="button" className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">Esqueceu a senha?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-800/50 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs py-3 px-4 rounded-lg flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              {error}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
            Entrar no Sistema
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col items-center gap-4">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Ambiente de Desenvolvimento</p>
          <button 
            onClick={handleDevLogin}
            className="flex items-center gap-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl border border-slate-700 transition-all group active:scale-95"
            title="Login rápido para desenvolvedores"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <ShieldCheck className="w-4 h-4 text-blue-500 group-hover:text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Acesso Direto</p>
              <p className="text-sm font-bold">Botão de Dev</p>
            </div>
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <p className="text-slate-600 text-[10px] font-medium tracking-widest uppercase">© 2026 CertSync CRM • Versão 1.0.0 Experimental</p>
      </div>
    </div>
  );
};
