import { http } from './client';
import { Unknown } from '../@types/util.type';

export const createWalletEndpoint = async (data: Unknown) => await http.post('/wallet', data);
