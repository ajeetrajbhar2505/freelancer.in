import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ErrorHandlingServiceService } from './services/error-handling-service.service';
import { Observable, catchError, retry, throwError } from 'rxjs';

export class  tokenInterceptor implements HttpInterceptor {

  constructor(private notifier: ErrorHandlingServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
              // this.notifier?.notify('error', error && error.message ? error.message : 'Error');
              return throwError(error);
          }
          ));
  }
}