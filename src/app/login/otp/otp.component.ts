import { Component, OnInit } from '@angular/core';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { verifyEMAIL, verifyOTP } from '../../constants/endpoint-usage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  OTPValue: number
  constructor(private changeDetectionService: ChangeDetectionServiceService, private router: Router, private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.changeDetectionService.routeTo.subscribe(data => {
      sessionStorage.setItem('routeTo', data)
    })
  }

  routeToPage() {
    const url = `/${sessionStorage.getItem('routeTo') ? sessionStorage.getItem('routeTo') : '/auth/register'}`
    this.router.navigate([url])
  }

  routeToForgot() {
    this.router.navigate(['/auth/forgot-password'])
  }


  async OnSubmit() {
    if (!this.OTPValue) {
      return
    }

    const apiURL = sessionStorage.getItem('routeTo') == '/auth/register' ? verifyEMAIL : verifyOTP

    try {
      const response = await this.apiService.postData(apiURL, { otp: this.OTPValue }).toPromise();
      if (response.status == 200) {
        this.router.navigate(['/chat/dashboard'])
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