import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoMenuItem,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { Icon } from 'src/app/enums/icon';
import { Image } from 'src/app/enums/image';
import { Label } from 'src/app/enums/label';
import { Route } from 'src/app/enums/route';
import { LoginService } from 'src/app/services/login/login.service';
import { getUser } from 'src/app/utils/user';
import { environment } from 'src/environments/environment';
import { MenuItems } from './menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  logo = environment.urlImagens + Image.DOCATO_LOGO;
  shortLogo = environment.urlImagens + Image.DOCATO_SECONDARYLOGO;

  profile: PoToolbarProfile;

  profileActions: Array<PoToolbarAction> = [
    {
      icon: Icon.EXIT,
      label: Label.SAIR,
      separator: true,
      action: () => {
        this.loginService.logout();
        this.router.navigate([Route.LOGIN]);
      },
    },
  ];

  menus = MenuItems.map((menuItem: PoMenuItem) => {
    return {
      ...menuItem,
      action: this.goTo.bind(this),
    };
  });

  constructor(private router: Router, private loginService: LoginService) {
    const user = getUser();
    this.profile = {
      title: user?.username || '',
      subtitle: user?.email || '',
    };
  }

  ngOnInit(): void {}

  /**
   * Redireciona para a pagina selecionada no menu.
   * @param menu Ícono do menu que selecionado
   */
  goTo(menu: PoMenuItem) {
    this.router.navigate([menu.link]);
  }
}
