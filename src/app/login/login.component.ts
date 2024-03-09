import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  IsToggledPass: boolean = false;
  IsToggledRem: boolean = true;

  togglePassword() {
    this.IsToggledPass = !this.IsToggledPass;
  }
  toggleRemember() {
    this.IsToggledRem = !this.IsToggledRem;
  }
}
