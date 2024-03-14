import { Component } from '@angular/core';
import { CommondataserviceService } from '../services/commondataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
}
