/** Service(s) */
import { http } from './client';

/** Type(s) */
import { Unknown } from '../@types/util.type';

export const bvnVerificationEndpoint = async (data: Unknown) =>
  await http.post('/bvn/verify-bvn', data);
