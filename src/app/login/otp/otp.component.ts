import { Component, OnInit } from '@angular/core';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { verifyOTP } from '../../constants/endpoint-usage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  otpgroup!: FormGroup;
  constructor(private changeDetectionService: ChangeDetectionServiceService, private router: Router, private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initiateotpgroup()
    window.scrollTo(0, 0);
    this.changeDetectionService.optdata.subscribe(data => {
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
    const { otp1, otp2, otp3, otp4 } = this.otpgroup.value;
    const otp = otp1.toString() + otp2.toString() + otp3.toString() + otp4.toString();

    try {
      const response = await this.apiService.postData(verifyOTP, { otp: parseInt(otp) }).toPromise();
      if (response.status == 200) {
        this.router.navigate(['/chat/dashboard'])
      } else {
        console.error('Failed to send OTP:', response);
      }
    } catch (error) {
      console.error('Error in routeToOtp:', error);
    }
  }


  initiateotpgroup() {
    this.otpgroup = this.fb.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
    });

    const firstOTPInput = document.getElementById('otp1');
    if (firstOTPInput) {
      firstOTPInput.focus();
    }
  }

  restrictmaxNumber(event: any, name: any) {
    const formcontrol: any = this.otpgroup.get(name);


    // Check if the event is a delete key press
    if (event.keyCode === 46) {
      // Move to the previous input element
      const previousInput = event.target.previousElementSibling;

      // If there is a previous input and it's an <input> element
      if (previousInput && previousInput.tagName === 'INPUT') {
        // Set focus on the previous input
        previousInput.focus();

        // Remove the value of the previous input
        const previousFormControl: any = this.otpgroup.get(previousInput.name);
        if (previousFormControl) {
          previousFormControl.patchValue('');
        }
      }
    } else if (formcontrol.value.toString().length > 1) {
      // If not a delete key press and length is greater than 1, truncate to the first character
      const truncatedNumber = formcontrol.value.toString().slice(0, 1);
      formcontrol.patchValue(truncatedNumber);
    }

    // Focus on the next input
    const nextInput = event.target.nextElementSibling;
    if (nextInput && nextInput.tagName === 'INPUT') {
      nextInput.focus();
    }
  }

}