import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoDialogService,
  PoDynamicFormField,
  PoModalComponent,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Icon } from 'src/app/enums/icon';
import { Regex } from 'src/app/enums/regex';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) modal: any;

  user: Partial<User> = {};
  users: User[] = [];

  loadingForm = false;

  fields: Array<PoDynamicFormField> = [
    {
      divider: 'DADOS PESSOAIS',
      order: 1,
      property: 'name',
      required: true,
      minLength: 4,
      maxLength: 100,
      gridColumns: 12,
      gridSmColumns: 12,
      pattern: Regex.JUST_LETTERS_AND_SPACE,
      errorMessage: 'O nome pode conter apenas letras',
      label: 'Nome',
      placeholder: 'Informe seu nome',
    },
    {
      order: 2,
      property: 'username',
      required: true,
      minLength: 6,
      maxLength: 50,
      gridColumns: 12,
      gridSmColumns: 12,
      pattern: Regex.JUST_LETTERS,
      errorMessage: 'O nome pode conter apenas letras sem espaços',
      label: 'Nome de usuário',
      placeholder: 'Como gostaria de ser chamado',
    },
    {
      order: 3,
      property: 'cpf',
      required: true,
      minLength: 14,
      maxLength: 14,
      gridColumns: 12,
      gridSmColumns: 12,
      mask: '999.999.999-99',
      errorMessage: 'CPF inválido',
      label: 'CPF',
      placeholder: 'Informe seu CPF',
    },
    {
      divider: 'ACESSO AO SISTEMA',
      order: 4,
      property: 'email',
      required: true,
      minLength: 4,
      maxLength: 100,
      gridColumns: 12,
      gridSmColumns: 12,
      pattern: Regex.EMAIL,
      errorMessage: 'Email inválido',
      label: 'Email',
      placeholder: 'Informe o email Email',
      icon: Icon.EMAIL,
    },
    {
      order: 5,
      property: 'password',
      required: this.user?._id ? false : true,
      visible: this.user?._id ? false : true,
      secret: true,
      minLength: 6,
      gridColumns: 12,
      gridSmColumns: 12,
      label: 'Senha',
      placeholder: 'Informe uma senha de acesso',
      icon: Icon.LOCK,
    },
  ];

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'name',
      label: 'Nome',
    },
    {
      property: 'cpf',
      label: 'CPF',
      width: '15%',
    },
    {
      property: 'email',
      label: 'Email',
      width: '25%',
    },
    {
      property: 'username',
      label: 'Usuário',
      width: '20%',
    },
    {
      property: 'acoes',
      label: 'Ações',
      type: 'icon',
      width: '10%',
      sortable: false,
      icons: [
        {
          action: this.editUser.bind(this),
          icon: Icon.EDIT,
          color: 'color-02',
          tooltip: 'Editar usuário',
          value: 'editar',
        },
        {
          action: this.clickRemoveUser.bind(this),
          icon: Icon.DELETE,
          color: 'color-07',
          tooltip: 'Remover usuário',
          value: 'remover',
        },
      ],
    },
  ];

  constructor(
    private userService: UserService,
    public poDialog: PoDialogService
  ) {}

  ngOnInit(): void {
    this.loadDataTable();
  }

  loadDataTable() {
    this.userService.getAll().subscribe({
      next: (data: User[]) => {
        this.users = data.map((data: User) => {
          return {
            ...data,
            acoes: ['editar', 'remover'],
          };
        });
      },
    });
  }

  private editUser(row: any) {
    this.user = row;
    this.modal.open();
  }

  newUser() {
    this.user = {};
    this.modal.open();
  }

  closeModal() {
    this.user = {};
    this.loadingForm = false;
    this.modal.close();
  }

  removeUser(_id: string) {
    this.userService.removeUser({ _id }).subscribe({
      next: (data: User) => {
        this.closeModal();
        this.loadDataTable();
      },
    });
  }

  clickRemoveUser(row: User) {
    this.poDialog.confirm({
      title: 'Confirmar',
      message: `Tem serteza que deseja remover o usuário ${row.name}`,
      confirm: () => this.removeUser(row._id),
    });
  }

  public saveUser() {
    this.loadingForm = true;
    if (this.user._id) {
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          this.closeModal();
          this.loadDataTable();
        },
        error: () => {
          this.loadingForm = false;
        },
      });
    } else {
      this.userService.addUser(this.user).subscribe({
        next: () => {
          this.closeModal();
          this.loadDataTable();
        },
        error: () => {
          this.loadingForm = false;
        },
      });
    }
  }
}
