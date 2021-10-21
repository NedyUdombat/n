import { http } from './client';
import { Code } from '../@types/token.type';

export const verificationEndpoint = async (data: Code) =>
  await http.post('/verification/verify-number', data);
export const requestVerificationCodeEndpoint = async (data: {
  email: string;
}) => await http.post('/verification/request-verification-code', data);
