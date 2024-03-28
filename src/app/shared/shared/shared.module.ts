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



@NgModule({
  declarations: [
    EmailRegexValidatorDirective,
    MobileRegexValidatorDirective,
    NumberOnlyRegexValidatorDirective,
    RestrictMultiSpaceRegexValidatorDirective,
  ],
  imports: [
    CommonModule
  ],
  providers : [
    ApiService,
    ChangeDetectionServiceService,
    ErrorHandlingServiceService,
    FileUploadServiceService,
    CommondataserviceService,
    WebsocketService
  ]
})
export class SharedModule { }
