import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  TOKEN_KEY = 'jwt-token';
  constructor(private storage: Storage, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleIntercept(req, next));
  }

  async handleIntercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = await this.storage.get(this.TOKEN_KEY);

    if(token) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        if(error.status === 401 || error.status === 403) {
          this.storage.remove(this.TOKEN_KEY).then(() => {
            this.authService.logout();
          });
        }
        return throwError(error);
      })
    ).toPromise();
  }
}
