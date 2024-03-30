import { Component, OnInit } from '@angular/core';
import { CommondataserviceService } from '../../services/commondataservice.service';
import { ApiService } from '../../services/api-service.service';
import { loginUrl } from '../../constants/endpoint-usage';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  IsToggledPass: boolean = false;
  IsToggledRem: boolean = true;

  constructor(private commonDataService: CommondataserviceService, private apiService: ApiService, private changeDetectionService: ChangeDetectionServiceService, private router: Router) { }

  togglePassword() {
    this.IsToggledPass = !this.IsToggledPass;
  }
  toggleRemember() {
    this.IsToggledRem = !this.IsToggledRem;
  }

  loginWithGoogle() {
    this.commonDataService.loginWithGoogle()
  }

  async routeToOtp() {
    try {
      const response = await this.apiService.postData(loginUrl, { username: 'ajeet', password: 'ajeet', email: 'ajeetrajbhar2504@gmail.com' }).toPromise();
      if (response.status === 200) {
        this.router.navigate(['/auth/otp'])
        localStorage.setItem('token', response.token)
      } else {
        console.error('Failed to send OTP:', response);
      }
    } catch (error) {
      console.error('Error in routeToOtp:', error);
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

}
