import { Token } from '../@types/token.type';
import { ROUTE_URLS } from '../routes/RouteUrls';

export const getToken = () => localStorage.getItem('token');

export const setToken = (token: Token): string | null => {
  localStorage.setItem('token', token);
  return getToken();
};

export const destroyToken = (): null => {
  localStorage.removeItem('token');
  return null;
};

export const setRedirectUrl = (url: string): void =>
  localStorage.setItem('redirectUrl', url);
export const removeRedirectUrl = (): void =>
  localStorage.removeItem('redirectUrl');

export const logout = () => {
  destroyToken();
  removeRedirectUrl();
  window.location.assign(ROUTE_URLS.AUTHENTICATION_URL);
};
