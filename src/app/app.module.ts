import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { ChatModule } from './chat/chat.module';
import { PasswordRegexValidatorDirective } from './regex-validator/password-regex-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    PasswordRegexValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LoginModule,
    ChatModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
