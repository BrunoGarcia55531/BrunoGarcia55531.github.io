import React from 'react';
import { AuthForm } from '../../components/auth/AuthForm';
import { login as loginService } from '../../services/auth/auth.service';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ui/ToastProvider';
import { useAuthContext } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuthContext();

  const handleLogin = async (_name: string, email: string, password: string) => {
    try {
      const user = await loginService(email, password);
      if (!user.token) throw new Error('No se recibió token');
      login(user, user.token);
      toast.success('¡Bienvenido!');
      navigate('/');
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.error('Credenciales incorrectas. Intenta nuevamente.');
      } else {
        toast.error(error?.response?.data?.message || 'Error al iniciar sesión');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 px-4">
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl flex flex-col justify-center bg-white dark:bg-blue-950/90 rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-800 p-8 md:p-12 gap-8">
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-200 mb-2 text-center md:text-left">Iniciar sesión</h2>
          <p className="text-blue-600 dark:text-blue-300 mb-6 text-center md:text-left">Accede a tu cuenta para comparar productos y gestionar tus favoritos.</p>
          <AuthForm onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
};
