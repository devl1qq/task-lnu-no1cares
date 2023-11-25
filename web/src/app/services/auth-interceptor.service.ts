import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (!token) {
      // if no token, just pass the request
      return next.handle(req);
    }

    const mutatedReq = req.clone({
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });

    return next.handle(mutatedReq);
  }
}
