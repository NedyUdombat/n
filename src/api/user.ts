import { http } from './client';

/** Type(s) */
import { User } from '../@types/user.type';

export const getUserEndpoint = async () => await http.get('/user');
export const updateUserEndpoint = async (data: User) =>
  await http.put('/user', data);
