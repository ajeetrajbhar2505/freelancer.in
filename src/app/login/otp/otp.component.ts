import { Component, OnInit } from '@angular/core';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { verifyEMAIL, verifyOTP } from '../../constants/endpoint-usage';
import { Location } from '@angular/common';
import { ToastserviceService } from '../../services/toastservice.service';
import { CommondataserviceService } from '../../services/commondataservice.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  OTPValue: number
  mailId: string
  constructor(
    private router: Router, private apiService: ApiService,
    private location: Location,
    private toastService: ToastserviceService,
    private readonly CommondataserviceService:CommondataserviceService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.mailId = localStorage.getItem('mailId')
  }

  dynamicRoute() {
    const url = `${localStorage.getItem('routeTo') || '/auth/login'}`;
    if (url == 'chat/dashboard') {
      this.CommondataserviceService.reloaddata.next(true)
      }
    this.router.navigate([url]);

  }


  routeToForgot() {
    this.router.navigate(['/auth/forgot-password'])
  }

  routeToPage() {
    this.location.back();
  }


  async OnSubmit() {
    if (!this.OTPValue || (this.OTPValue.toString.length > 4)) {
      return
    }

    const apiURL = localStorage.getItem('routeTo') == '/auth/register' ? verifyEMAIL : verifyOTP

    try {
      const response = await this.apiService.postData(apiURL, { otp: this.OTPValue }).toPromise();
      if (response.status == 200) {
        this.toastService.success(response.message)
        this.dynamicRoute()
      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }
  }


  onOtpChange(OTP) {
    this.OTPValue = OTP
    if (!this.OTPValue) {
      return
    }
    this.OnSubmit()
  }

}