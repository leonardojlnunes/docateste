import { LocalStorage } from '../enums/local-storage';
import { User } from '../interfaces/user';

/**
 * Remove user armazenado no storage
 */
export const removeUser = () => {
  localStorage.removeItem(LocalStorage.USER_NAME);
  localStorage.removeItem(LocalStorage.USER_EMAIL);
};

/**
 * Consultar user armazenado no local storage
 * @returns {string | null} user | null = caso não exista
 */
export const getUser = (): Partial<User> | null => {
  return {
    email: localStorage.getItem(LocalStorage.USER_EMAIL) || '',
    username: localStorage.getItem(LocalStorage.USER_NAME) || '',
  };
};

/**
 * Inserir user no local storage
 * @param user user a ser armazenado
 */
export const setUser = (user: Partial<User>) => {
  localStorage.setItem(LocalStorage.USER_NAME, user.username || '');
  localStorage.setItem(LocalStorage.USER_EMAIL, user.email || '');
};
