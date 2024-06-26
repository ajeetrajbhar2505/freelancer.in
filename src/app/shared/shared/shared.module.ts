import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailRegexValidatorDirective } from '../../regex-validator/email-regex-validator.directive';
import { MobileRegexValidatorDirective } from '../../regex-validator/mobile-regex-validator.directive';
import { NumberOnlyRegexValidatorDirective } from '../../regex-validator/number-only-regex-validator.directive';
import { RestrictMultiSpaceRegexValidatorDirective } from '../../regex-validator/restrict-multi-space-regex-validator.directive';
import { ApiService } from '../../services/api-service.service';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { ErrorHandlingServiceService } from '../../services/error-handling-service.service';
import { FileUploadServiceService } from '../../services/file-upload-service.service';
import { CommondataserviceService } from '../../services/commondataservice.service';
import { WebsocketService } from '../../services/websocket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { RegisterComponent } from '../../login/register/register.component';
import { DashboardComponent } from '../../login/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../login/forgot-password/forgot-password.component';
import { chatDashboardComponent } from '../../chat/dashboard/dashboard.component';
import { OtpComponent } from '../../login/otp/otp.component';
import { RoomComponent } from '../../chat/room/room.component';
import { StatusComponent } from '../../chat/status/status.component';
import { PasswordRegexValidatorDirective } from '../../regex-validator/password-regex-validator.directive';
import { RouterModule } from '@angular/router';
import { ConfirmPasswordComponent } from '../../login/confirm-password/confirm-password.component';
import { ToastserviceService } from '../../services/toastservice.service';
import { ToastComponent } from '../../toast/toast.component';
import { LoaderService } from '../../services/loader.service';



@NgModule({
  declarations: [
    EmailRegexValidatorDirective,
    MobileRegexValidatorDirective,
    NumberOnlyRegexValidatorDirective,
    RestrictMultiSpaceRegexValidatorDirective,
    PasswordRegexValidatorDirective,
    DashboardComponent, 
    ForgotPasswordComponent, 
    OtpComponent, 
    RegisterComponent,
    ConfirmPasswordComponent,
    chatDashboardComponent, 
    StatusComponent, 
    RoomComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
    RouterModule
  ],
  providers: [
    ApiService,
    ChangeDetectionServiceService,
    ErrorHandlingServiceService,
    FileUploadServiceService,
    CommondataserviceService,
    WebsocketService,
    ToastserviceService,
    LoaderService
  ]
})
export class SharedModule { }
