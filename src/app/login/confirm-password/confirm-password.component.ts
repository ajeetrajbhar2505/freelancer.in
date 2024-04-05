import { Component, OnInit } from '@angular/core';
import { CommondataserviceService } from '../../services/commondataservice.service';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { ApiService } from '../../services/api-service.service';
import { resetPasswordUrl } from '../../constants/endpoint-usage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrl: './confirm-password.component.scss'
})
export class ConfirmPasswordComponent implements OnInit {
  IsToggledPass: boolean = false;
  IsToggledConfirmPass: boolean = false;
  IsToggledRem: boolean = true;
  submitted: boolean = false;
  registerForm:FormGroup
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
    this.setupPasswordMismatchHandler();

  }

  initiateGroup() {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/\S/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/\S/)]],
    });
  }



  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  setupPasswordMismatchHandler() {
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword');

    confirmPasswordControl.valueChanges.subscribe(() => {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ 'passwordMismatch': true });
      } else if(confirmPasswordControl.invalid) {
        confirmPasswordControl.setErrors({'required' : true});
      }
      else {
        confirmPasswordControl.setErrors(null);
      }
    });
  }

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
    this.submitted = true
    if (this.registerForm.invalid) {
      return;
    }
    try {
      const payload = this.registerForm.value
      const response = await this.apiService.postData(resetPasswordUrl, payload).toPromise();
      if (response.status === 201 || response.status === 200) {
        this.router.navigate(['/auth/forgot-password'])
        localStorage.setItem('token', response.token)

      } else {
        console.error('Failed to send OTP:', response);
      }
    } catch (error) {
      console.error('Error in routeToOtp:', error);
    }
  }

}
