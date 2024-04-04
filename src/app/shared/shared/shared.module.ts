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



@NgModule({
  declarations: [
    EmailRegexValidatorDirective,
    MobileRegexValidatorDirective,
    NumberOnlyRegexValidatorDirective,
    RestrictMultiSpaceRegexValidatorDirective,
    DashboardComponent, 
    ForgotPasswordComponent, 
    OtpComponent, 
    RegisterComponent,
    chatDashboardComponent, StatusComponent, RoomComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule
  ],
  providers: [
    ApiService,
    ChangeDetectionServiceService,
    ErrorHandlingServiceService,
    FileUploadServiceService,
    CommondataserviceService,
    WebsocketService
  ]
})
export class SharedModule { }
