import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return checkUserExists(this.router);
  }
}


function checkUserExists(router: Router): Observable<boolean> {
  const token = localStorage.getItem('token');
  if (!token || token == 'undefined') {
    localStorage.clear()
    router.navigate(['/auth/login']);
    return of(false);
  }
  return of(true);
}