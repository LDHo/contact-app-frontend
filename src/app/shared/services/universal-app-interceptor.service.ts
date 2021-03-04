import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { JWTTokenService } from './jwt.service';
import { LocalStorageService } from '../../pages/auth/services/local-storage.service';
import { UserStorageKey } from '../../pages/auth/models/storage.key';

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor(
    private authService: JWTTokenService,
    private localStorage: LocalStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem(UserStorageKey.CURRENT_USER_SESSION_TOKEN);
    if (token) {
      req = req.clone({
        url: req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}