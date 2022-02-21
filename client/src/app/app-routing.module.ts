import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateModule } from './components/private/private.module';
import { LoginComponent } from './components/public/login/login.component';
import { Route } from './enums/route';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: Route.LOGIN, component: LoginComponent },
  {
    path: Route.ROOT,
    loadChildren: () => PrivateModule,
    canActivate: [AuthGuard],
  },
  { path: Route.WILDCARD, redirectTo: Route.ROOT },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
