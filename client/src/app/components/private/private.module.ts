import { NgModule } from '@angular/core';

import { PrivateRoutingModule } from './private-routing.module';
import { AuthTokenInterceptor } from 'src/app/interceptor/auth-token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoModalModule, PoModule, PoPageModule } from '@po-ui/ng-components';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MenuComponent, ProductComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    PrivateRoutingModule,
    PoModule,
    PoPageModule,
    PoModalModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [MenuComponent],
})
export class PrivateModule {}
