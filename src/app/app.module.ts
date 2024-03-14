import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ApiServiceService } from './services/api-service.service';
import { ChangeDetectionServiceService } from './services/change-detection-service.service';
import { ErrorHandlingServiceService } from './services/error-handling-service.service';
import { FileUploadServiceService } from './services/file-upload-service.service';
import { CommondataserviceService } from './services/commondataservice.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    ApiServiceService,
    ChangeDetectionServiceService,
    ErrorHandlingServiceService,
    FileUploadServiceService,
    CommondataserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
