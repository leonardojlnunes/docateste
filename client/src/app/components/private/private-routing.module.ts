import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from 'src/app/enums/route';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: Route.PRODUCT,
        component: ProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: Route.USER,
        component: UserComponent,
        canActivate: [AuthGuard],
      },
      { path: Route.WILDCARD, redirectTo: Route.PRODUCT },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
