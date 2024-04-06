import { Component, OnInit, ViewChild } from '@angular/core';
import { CommondataserviceService } from '../../services/commondataservice.service';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { ApiService } from '../../services/api-service.service';
import { resetPasswordUrl } from '../../constants/endpoint-usage';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastserviceService } from '../../services/toastservice.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrl: './confirm-password.component.scss'
})
export class ConfirmPasswordComponent implements OnInit {
  @ViewChild('password') password: any;
  @ViewChild('confirmPassword') confirmPassword: any;
  IsToggledPass: boolean = false;
  IsToggledConfirmPass: boolean = false;
  IsToggledRem: boolean = true;
  submitted: boolean = false;
  confirmPassForm:FormGroup
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
    this.confirmPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/\S/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/\S/)]],
    });
  }



  focusInput(inputName: string) {
    switch (inputName) {
      case 'password':
        this.password.nativeElement.focus();
        break;
      case 'confirmPassword':
        this.confirmPassword.nativeElement.focus();
        break;
      default:
        console.error('Invalid input name');
    }
  }


  // Convenience getter for easy access to form fields
  get f() { return this.confirmPassForm.controls; }

  setupPasswordMismatchHandler() {
    const passwordControl = this.confirmPassForm.get('password');
    const confirmPasswordControl = this.confirmPassForm.get('confirmPassword');

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
    if (this.confirmPassForm.invalid) {
      return;
    }
    try {
      const payload = this.confirmPassForm.value
      const response = await this.apiService.postData(resetPasswordUrl, payload).toPromise();
      if (response.status == 201 || response.status == 200) {
        this.router.navigate(['/auth/forgot-password'])
        localStorage.setItem('token', response.token)
        this.toastService.success(response.message)

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }
  }

}
