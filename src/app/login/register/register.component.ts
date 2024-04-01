import { Component, OnInit } from '@angular/core';
import { CommondataserviceService } from '../../services/commondataservice.service';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { ApiService } from '../../services/api-service.service';
import { signUpUrl } from '../../constants/endpoint-usage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  IsToggledPass: boolean = false;
  IsToggledConfirmPass: boolean = false;
  IsToggledRem: boolean = true;

  constructor(private commonDataService:CommondataserviceService,private changeDetectionService:ChangeDetectionServiceService,public apiService:ApiService){}


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
   async routeToOtp() {
    try {
      const response = await this.apiService.postData(signUpUrl, { username : 'ajeet', password : 'ajeet', email : 'ajeetrajbhar2504@gmail.com' }).toPromise();
      if (response.status === 200) {
        this.changeDetectionService.routeTo.next('/auth/register');
      } else {
        console.error('Failed to send OTP:', response);
      }
    } catch (error) {
      console.error('Error in routeToOtp:', error);
    }
  }
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
