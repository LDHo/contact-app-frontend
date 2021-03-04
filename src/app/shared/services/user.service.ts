import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JWTTokenService } from './jwt.service';

@Injectable()
export class UserService {

  constructor(
    private httpService: HttpService,
    private jwt: JWTTokenService
  ) {

  }

  registerUser(email: string, password: string): Observable<any> {
    const registerApiUrl = `${environment.apiUrls.users.domainName}${environment.apiUrls.users.register}`;
    const payload = {
      email,
      password
    }
    return this.httpService.post(registerApiUrl, payload)
      .pipe(
        catchError(this.httpService.handleError)
      );
  }

  login(email: string, password: string): Observable<any> {
    const loginApiUrl = `${environment.apiUrls.users.domainName}${environment.apiUrls.users.login}`;
    const payload = {
      email,
      password
    };
    return this.httpService.post(loginApiUrl, payload).pipe(
      catchError(this.httpService.handleError)
    );
  }

  // required to be authenticated before calling
  getProfile(): Observable<any> {
    const getProfileUrl = `${environment.apiUrls.users.domainName}${environment.apiUrls.users.getProfile}`;
    return this.httpService.get(getProfileUrl).pipe(
      catchError(this.httpService.handleError)
    );
  }

  updateUserProfile(userId: string, payload: any): Observable<any> {
    const updateUserProfileUrl = `${environment.apiUrls.users.domainName}${environment.apiUrls.users.updateProfile}/${userId}`;
    return this.httpService.patch(updateUserProfileUrl, payload).pipe(
      catchError(this.httpService.handleError)
    );
  }
}