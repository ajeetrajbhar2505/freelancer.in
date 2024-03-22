import { Component, OnInit } from '@angular/core';
import { CommondataserviceService } from '../../services/commondataservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  IsToggledPass: boolean = false;
  IsToggledRem: boolean = true;

  constructor(private commonDataService:CommondataserviceService){}

  togglePassword() {
    this.IsToggledPass = !this.IsToggledPass;
  }
  toggleRemember() {
    this.IsToggledRem = !this.IsToggledRem;
  }

  loginWithGoogle() {
   this.commonDataService.loginWithGoogle()
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  
}
