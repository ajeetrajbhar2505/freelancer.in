import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    return checkUserExists(this.router);
  }
}

function checkUserExists(router: Router): boolean {
  if (!localStorage.getItem('token')) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
}
