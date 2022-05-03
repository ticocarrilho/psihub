import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if(token) {
      const reqAuth = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });

      return next.handle(reqAuth).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.logout();
          window.location.reload();
        }

        return throwError(() => err);
      }));
    }

    return next.handle(request);
  }
}
