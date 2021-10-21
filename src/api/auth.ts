import { http } from './client';
import { User } from '../@types/user.type';
import { Unknown } from '../@types/util.type';

export const registrationEndpoint = async (data: User) => await http.post('/auth/register', data);
export const authenticationEndpoint = async (data: User) => await http.post('/auth/login', data);
export const forgotPasswordEndpoint = async (data: Unknown) => await http.post('/auth/forgot-password', data);
export const resetPasswordEndpoint = async (data: Unknown) => await http.post('/auth/reset-password', data);
