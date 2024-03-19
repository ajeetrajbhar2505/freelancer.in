import { Component, OnInit } from '@angular/core';
import { ChangeDetectionServiceService } from '../services/change-detection-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  constructor(private changeDetectionService: ChangeDetectionServiceService, private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.changeDetectionService.optdata.subscribe(data => {
      sessionStorage.setItem('routeTo', data)
    })
  }

  routeToPage() {
    const url = `/${sessionStorage.getItem('routeTo')}`
    this.router.navigate([url])
  }

  routeToForgot(){
    this.router.navigate(['forgot-password'])
  }

}
