import { LocalStorage } from '../enums/local-storage';

/**
 * Remove token armazenado no storage
 */
export const removeToken = () => localStorage.removeItem(LocalStorage.TOKEN);

/**
 * Consultar token armazenado no local storage
 * @returns {string | null} token | null = caso não exista
 */
export const getToken = (): string | null => {
  return localStorage.getItem(LocalStorage.TOKEN);
};

/**
 * Inserir token no local storage
 * @param token token a ser armazenado
 */
export const setToken = (token: String) =>
  localStorage.setItem(LocalStorage.TOKEN, token as string);

/**
 * Validar token
 * @param token token do usuário
 * @returns {boolean} true = token valido | false = token valido
 */
export const validToken = (token: string | null): boolean => {
  if (token) {
    const payload = atob(token.split('.')[1]);
    const parsedPayload = JSON.parse(payload);
    return parsedPayload.exp > Date.now() / 1000;
  }
  return false;
};
