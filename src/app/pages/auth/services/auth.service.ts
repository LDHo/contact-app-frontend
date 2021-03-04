import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';

import { User } from '../models';
import { UserStorageKey } from '../models/storage.key';
import { JWTTokenService, TokenPayload } from '../../../shared/services/jwt.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private jwtService: JWTTokenService
  ) {

  }
  public login(email, password): void {
    this.userService.login(email, password).subscribe(response => {
      const decodeToken: TokenPayload = this.jwtService.getDecodeToken(response.token);
      this.localStorage.set(UserStorageKey.CURRENT_USER_SESSION_TOKEN, response.token);
      this.localStorage.set(UserStorageKey.USER_ID, decodeToken.id);
    })
  }

  public sign(email, password): void {
    this.userService.registerUser(email, password).subscribe(response => {
      console.log(response);
      this.login(email, password);
    });
  }

  public signOut(): void {
    this.localStorage.remove(UserStorageKey.CURRENT_USER_SESSION_TOKEN);
    this.localStorage.remove(UserStorageKey.USER_ID);
  }

  public getUser(): Observable<any> {
    return this.userService.getProfile();
  }
}
