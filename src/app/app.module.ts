import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { ToastComponent } from './toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastserviceService } from './services/toastservice.service';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ToastserviceService,
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
