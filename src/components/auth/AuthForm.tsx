import React, { useState } from 'react';

interface AuthFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isRegister?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      onSubmit(name, email, password);
    } else {
      onSubmit('', email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md mx-auto">
      {isRegister && (
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="border-2 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-blue-900/30 placeholder-blue-400 text-blue-900 dark:text-blue-100 border-blue-300 focus:border-blue-500 transition-colors text-base shadow-sm"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border-2 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-blue-900/30 placeholder-blue-400 text-blue-900 dark:text-blue-100 border-blue-300 focus:border-blue-500 transition-colors text-base shadow-sm"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="border-2 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 dark:bg-blue-900/30 placeholder-blue-400 text-blue-900 dark:text-blue-100 border-blue-300 focus:border-blue-500 transition-colors text-base shadow-sm"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-lg font-bold text-lg tracking-wide mt-2 border-2 border-blue-500 hover:border-blue-700 scale-100 hover:scale-105 active:scale-95 duration-150"
      >
        {isRegister ? 'Registrarse' : 'Iniciar sesión'}
      </button>
      {!isRegister && (
        <div className="text-center mt-2">
          <span className="text-blue-700 dark:text-blue-300">¿No tienes cuenta?</span>
          <a href="/register" className="ml-2 text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors font-medium">Regístrate</a>
        </div>
      )}
      {isRegister && (
        <div className="text-center mt-2">
          <span className="text-blue-700 dark:text-blue-300">¿Ya tienes cuenta?</span>
          <a href="/login" className="ml-2 text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors font-medium">Inicia sesión</a>
        </div>
      )}
    </form>
  );
};
