import { http } from './client';

export const getUserEndpoint = async () => await http.get('/user');
