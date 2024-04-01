import { Component, OnInit } from '@angular/core';
import { ChangeDetectionServiceService } from '../../services/change-detection-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private changeDetectionService: ChangeDetectionServiceService) { }

  loginWithGoogle() {

  }

  routeToOtp() {
    this.changeDetectionService.routeTo.next('/auth/forgot-password')
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
