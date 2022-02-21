import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '../enums/route';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  /**
   * Função que verifica se existe um usuário ativo no momento.
   * Caso não tenha, não terá acesso ao recurso/componente solicitado,
   * e será redirecionado para o login.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate([Route.LOGIN]);
      return false;
    }
    return true;
  }
}
