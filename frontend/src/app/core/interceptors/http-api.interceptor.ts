import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {

  constructor(@Inject('BASE_API_URL') private baseUrl: string) { };

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = httpRequest.clone({ url: `${this.baseUrl}/${httpRequest.url}` });
    return next.handle(apiReq);
  }
}