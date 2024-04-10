// token.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {

  constructor(private router:Router,private  readonly loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    // Get the JWT token from local storage or wherever you store it
    const token = localStorage.getItem('token');

    // Clone the request and attach the token as an Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
        
      });
    }

    // Pass the modified request to the next handler
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // If status code is 401 or 500, redirect to login page
        if (error.status == 401 || error.status == 500) {
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.hideLoader(); // Hide loader when response is received
      })
    );
  }
}
