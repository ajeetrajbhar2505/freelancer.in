import { Component } from '@angular/core';
import { CommondataserviceService } from '../services/commondataservice.service';
import { ChangeDetectionServiceService } from '../services/change-detection-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  IsToggledPass: boolean = false;
  IsToggledConfirmPass: boolean = false;
  IsToggledRem: boolean = true;

  constructor(private commonDataService:CommondataserviceService,private changeDetectionService:ChangeDetectionServiceService){}


  togglePassword() {
    this.IsToggledPass = !this.IsToggledPass;
  }
  toggleConfirmPassword() {
    this.IsToggledConfirmPass = !this.IsToggledConfirmPass;
  }
  toggleRemember() {
    this.IsToggledRem = !this.IsToggledRem;
  }
  loginWithGoogle() {
    this.commonDataService.loginWithGoogle()
   }

   routeToOtp(){
    this.changeDetectionService.optdata.next('register')
  }
}
