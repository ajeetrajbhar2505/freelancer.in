import { Component, OnInit, ViewChild } from '@angular/core';
import { CommondataserviceService } from '../../services/commondataservice.service';
import { ApiService } from '../../services/api-service.service';
import { loginUrl } from '../../constants/endpoint-usage';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastserviceService } from '../../services/toastservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild('email') email: any;
  @ViewChild('password') password: any;
  loginForm: FormGroup
  IsToggledPass: boolean = false;
  IsToggledRem: boolean = true;
  submitted: boolean = false;
  constructor(private commonDataService: CommondataserviceService,
    private apiService: ApiService, private changeDetectionService: ChangeDetectionServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastserviceService
  ) { }


  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    this.initiateGroup()
  }

  initiateGroup() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/\S/)]]
    });
  }




  focusInput(inputName: string) {
    switch (inputName) {
      case 'email':
        this.email.nativeElement.focus();
        break;
      case 'password':
        this.password.nativeElement.focus();
        break;
      default:
        console.error('Invalid input name');
    }
  }


  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }



  togglePassword() {
    this.IsToggledPass = !this.IsToggledPass;
  }
  toggleRemember() {
    this.IsToggledRem = !this.IsToggledRem;
  }

  loginWithGoogle() {
    this.commonDataService.loginWithGoogle()
    this.router.navigate(['/auth/otp'])
    this.changeDetectionService.nextRoute.next('/chat/dashboard')
  }

  async routeToOtp() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return;
    }
    try {
      const payload = this.loginForm.value
      const response = await this.apiService.postData(loginUrl, payload).toPromise();
      if (response.status == 200) {
        this.submitted = false
        this.router.navigate(['/auth/otp'])
        localStorage.setItem('token', response.token)
        localStorage.setItem('userDetails', JSON.stringify(response.userDetails))
        localStorage.setItem('mailId', this.loginForm.controls['email'].value)
        localStorage.setItem('routeTo', '/chat/dashboard')

      } else {
        this.toastService.error(response.message)
      }
    } catch (error) {
      this.toastService.error('Server error')
    }
    
  }



}
