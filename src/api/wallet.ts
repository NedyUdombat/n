/** Service(s) */
import { http } from './client';

/** Type(s) */
import { Unknown } from '../@types/util.type';

export const createWalletEndpoint = async (data: Unknown) =>
  await http.post('/wallet', data);
