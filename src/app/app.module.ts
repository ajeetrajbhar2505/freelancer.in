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
import { RouterModule } from '@angular/router';
import { RestrictMultiSpaceRegexValidatorDirective } from './regex-validator/restrict-multi-space-regex-validator.directive';
import { NumberOnlyRegexValidatorDirective } from './regex-validator/number-only-regex-validator.directive';
import { MobileRegexValidatorDirective } from './regex-validator/mobile-regex-validator.directive';
import { EmailRegexValidatorDirective } from './regex-validator/email-regex-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    EmailRegexValidatorDirective,
    MobileRegexValidatorDirective,
    NumberOnlyRegexValidatorDirective,
    RestrictMultiSpaceRegexValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
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
