import { Component, OnInit } from '@angular/core';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { verifyEMAIL, verifyOTP } from '../../constants/endpoint-usage';
import { Location } from '@angular/common';

export interface otpDetails{}

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  OTPValue: number
  mailId:string
  constructor(private changeDetectionService: ChangeDetectionServiceService, 
    private router: Router, private apiService: ApiService, 
    private location: Location
    ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.mailId =  localStorage.getItem('mailId')
    this.changeDetectionService.nextRoute.subscribe(data => {
    sessionStorage.setItem('routeTo', data)
    })
  }
  
  dynamicRoute() {
    const url = `${sessionStorage.getItem('routeTo') || '/auth/login'}`;
    this.router.navigate([url]);
  }
  

  routeToForgot() {
    this.router.navigate(['/auth/forgot-password'])
  }

  routeToPage(){
    this.location.back();
  }


  async OnSubmit() {
    if (!this.OTPValue) {
      return
    }

    const apiURL = sessionStorage.getItem('routeTo') == '/auth/register' ? verifyEMAIL : verifyOTP

    try {
      const response = await this.apiService.postData(apiURL, { otp: this.OTPValue }).toPromise();
      if (response.status == 200) {
        this.dynamicRoute()
      } else {
        console.error('Failed to send OTP:', response);
      }
    } catch (error) {
      console.error('Error in routeToOtp:', error);
    }
  }


  onOtpChange(OTP) {
    this.OTPValue = OTP
  }

}