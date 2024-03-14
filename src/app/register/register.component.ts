import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  IsToggledPass: boolean = false;
  IsToggledConfirmPass: boolean = false;
  IsToggledRem: boolean = true;

  togglePassword() {
    this.IsToggledPass = !this.IsToggledPass;
  }
  toggleConfirmPassword() {
    this.IsToggledConfirmPass = !this.IsToggledConfirmPass;
  }
  toggleRemember() {
    this.IsToggledRem = !this.IsToggledRem;
  }
}
