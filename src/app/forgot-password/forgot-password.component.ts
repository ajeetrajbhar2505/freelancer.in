import { Component } from '@angular/core';
import { ChangeDetectionServiceService } from '../services/change-detection-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  constructor(private changeDetectionService:ChangeDetectionServiceService){}

  loginWithGoogle(){
    
  }

  routeToOtp(){
    this.changeDetectionService.optdata.next('forgot-password')
  }
}
