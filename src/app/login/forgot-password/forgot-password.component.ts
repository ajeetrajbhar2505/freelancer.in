import { Component, OnInit } from '@angular/core';
import { CommondataserviceService } from '../../services/commondataservice.service';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { ApiService } from '../../services/api-service.service';
import { getOTPUrl } from '../../constants/endpoint-usage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  submitted: boolean = false;
  forgotPassForm:FormGroup
  constructor(private router: Router,
    private commonDataService: CommondataserviceService,
    private changeDetectionService: ChangeDetectionServiceService,
    public apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    this.initiateGroup()

  }

  initiateGroup() {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }



  // Convenience getter for easy access to form fields
  get f() { return this.forgotPassForm.controls; }


  async routeToConfirmPass() {
    this.submitted = true
    if (this.forgotPassForm.invalid) {
      return;
    }
    try {
      const payload = this.forgotPassForm.value
      const response = await this.apiService.postData(getOTPUrl, payload).toPromise();
      if (response.status === 201 || response.status === 200) {
        this.router.navigate(['/auth/otp'])
        this.changeDetectionService.nextRoute.next('/auth/confirm-password');
        localStorage.setItem('token', response.token)
        localStorage.setItem('mailId', this.forgotPassForm.controls['mailId'].value)
      } else {
        console.error('Failed to send OTP:', response);
      }
    } catch (error) {
      console.error('Error in routeToOtp:', error);
    }
  }

}
