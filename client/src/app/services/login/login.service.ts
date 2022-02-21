import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteApi } from 'src/app/enums/route-api';
import { Auth } from 'src/app/interfaces/auth';
import { Login } from 'src/app/interfaces/login';
import { getToken, removeToken, validToken } from 'src/app/utils/token';
import { removeUser } from 'src/app/utils/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  /**
   * Requisição para autenticar usuário
   * @param email
   * @param password
   * @returns boolean
   */
  public login(login: Login): Observable<Auth> {
    return this.http.post<Auth>(environment.server + RouteApi.AUTH, login);
  }

  /**
   * Usada para sair do sistema:
   * - limpa o token armazenado storage.
   * - redireciona o usuário para o login.
   */
  async logout() {
    removeToken;
    removeUser();
  }

  /**
   * Busca o token local storage
   * decodifica o token e converte para um objeto
   * então verifica se o token expirou.
   * @returns Se expirou ou não existe retorna "false"
   */
  isLoggedIn() {
    const token = getToken();
    return validToken(token);
  }
}
