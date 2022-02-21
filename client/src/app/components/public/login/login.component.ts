import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { Image } from 'src/app/enums/image';
import { Regex } from 'src/app/enums/regex';
import { Route } from 'src/app/enums/route';
import { Auth } from 'src/app/interfaces/auth';
import { LoginService } from 'src/app/services/login/login.service';
import { setToken } from 'src/app/utils/token';
import { setUser } from 'src/app/utils/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  literals: PoPageLoginLiterals = {
    highlightInfo: '',
    welcome: 'Boas-vindas',
    loginErrorPattern: 'Email obrigatório',
    loginHint: '',
    loginLabel: 'Email',
    loginPlaceholder: 'Insira seu email de acesso',
    passwordErrorPattern: 'Senha obrigatória',
    passwordLabel: 'Senha',
    passwordPlaceholder: 'Insira sua senha de acesso',
    registerUrl: 'Criar Conta',
    submitLabel: 'Acessar sistema',
    submittedLabel: 'Carregando...',
  };

  loginPattern = Regex.EMAIL;
  logo = environment.urlImagens + Image.DOCATO_LOGO;
  secondaryLogo = environment.urlImagens + Image.DOCATO_SECONDARYLOGO;
  background = environment.urlImagens + Image.DOCATO_BACKGROUND;
  loading = false;

  constructor(private loginService: LoginService, private router: Router) {}

  /**
   * Evento do botão acessar o sistema
   * @param formData formulário que foi preenchido
   */
  loginSubmit(formData: PoPageLogin) {
    this.loading = true;
    this.loginService.login({ ...formData, email: formData.login }).subscribe({
      next: (data: Auth) => {
        setToken(data.token);
        setUser(data.user);
        this.router.navigate([Route.PRODUCT]);
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
