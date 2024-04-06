import { Component, OnInit } from '@angular/core';
import { CommondataserviceService } from '../../services/commondataservice.service';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { ApiService } from '../../services/api-service.service';
import { signUpUrl } from '../../constants/endpoint-usage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastserviceService } from '../../services/toastservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  IsToggledPass: boolean = false;
  IsToggledConfirmPass: boolean = false;
  IsToggledRem: boolean = true;
  submitted: boolean = false;
  registerForm:FormGroup
  constructor(private router: Router,
    private commonDataService: CommondataserviceService,
    private changeDetectionService: ChangeDetectionServiceService,
    public apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastService:ToastserviceService
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
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
    this.router.navigate(['/auth/otp'])
    this.changeDetectionService.nextRoute.next('/auth/register');
  }
  async routeToOtp() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return;
    }
    try {
      const payload = this.registerForm.value
      const response = await this.apiService.postData(signUpUrl, payload).toPromise();
      if (response.status == 201 || response.status == 200) {
        this.toastService.success(response.message)
        this.router.navigate(['/auth/otp'])
        this.changeDetectionService.nextRoute.next('/auth/register');
        localStorage.setItem('token', response.token)
      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }
  }

}
