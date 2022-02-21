import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteApi } from 'src/app/enums/route-api';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  resource = '';

  constructor(private http: HttpClient) {
    this.resource = environment.server + RouteApi.USER;
  }

  /**
   * Busca de usuários
   * @returns lista de usuários
   */
  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.resource);
  }

  /**
   * Remover usuário
   * @returns usuário removido
   */
  public removeUser(user: Partial<User>): Observable<User> {
    return this.http.delete<User>(`${this.resource}/${user._id}`);
  }

  /**
   * Adicionar usuário
   * @returns usuário adicionado
   */
  public addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.resource, user);
  }

  /**
   * Adicionar usuário
   * @returns usuário adicionado
   */
  public updateUser(user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.resource}/${user._id}`, user);
  }
}
