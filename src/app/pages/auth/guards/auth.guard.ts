import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { routes } from '../../../consts';
import { JWTTokenService } from '../../../shared/services/jwt.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public routers: typeof routes = routes;

  constructor(
    private router: Router,
    private jwtService: JWTTokenService,
    private localStorageService: LocalStorageService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('CURRENT_USER_SESSION_TOKEN');
    console.log('token:: ', token);
    console.log('i run here');

    if (this.jwtService.getUser(token)) {
      if (this.jwtService.isTokenExpired(token)) {
        // redirect to sign in page
        console.log('token expired');
        this.router.navigate(['login']);
      } else {
        console.log('token is not expired');
        return true;
      }
    }
    else {
      this.router.navigate(['login']);
      // redirect to sign in page
    }
  }
}
