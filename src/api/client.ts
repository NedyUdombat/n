import axios, { AxiosInstance } from 'axios';

import { getToken } from './helpers';
import config from '../config';

let http: AxiosInstance;

(async () => {
  let Authorization;

  if (getToken()) {
    Authorization = { 'x-auth-token': `${getToken()}` };
  }

  http = axios.create({
    baseURL: config?.BASE_URL,
    headers: { ...Authorization },
  });
})();

export { http };
