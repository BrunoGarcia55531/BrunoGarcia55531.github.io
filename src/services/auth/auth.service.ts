import axios from '../../utils/api';
import { User } from '../../interfaces/auth/auth.types';

// Cambia la firma para devolver el user plano + token
export const login = async (email: string, password: string): Promise<User> => {
  const response = await axios.post('/auth/login', { email, password });
  // El backend devuelve { token, user }
  const { user, token } = response.data;
  // Parche: si viene _id o userId, mapea a id
  if (!user.id && (user._id || user.userId)) {
    user.id = user._id || user.userId;
  }
  // Asegura que id sea número
  if (user.id) user.id = Number(user.id);
  user.token = token;
  return user;
};

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  authType: string;
  role: string;
}

export const register = async (payload: RegisterPayload): Promise<User> => {
  const response = await axios.post('/auth/register', payload);
  const user = response.data.user || response.data;
  if (!user.id && (user._id || user.userId)) {
    user.id = user._id || user.userId;
  }
  if (user.id) user.id = Number(user.id);
  if (response.data.token) user.token = response.data.token;
  return user;
};
