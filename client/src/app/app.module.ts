import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModalModule, PoModule } from '@po-ui/ng-components';
import { LoginComponent } from './components/public/login/login.component';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { HttpClientModule } from '@angular/common/http';
import { PrivateModule } from './components/private/private.module';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PoModule,
    PoPageLoginModule,
    PrivateModule,
    PoModalModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
