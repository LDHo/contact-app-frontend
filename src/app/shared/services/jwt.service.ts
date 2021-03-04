import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

export interface TokenPayload {
  id: string;
  exp: number;
  iat: number;
  email: string;
}

@Injectable()
export class JWTTokenService {

  constructor() {
  }

  getDecodeToken<TokenPayload>(jwtToken: string): TokenPayload {
    return jwt_decode(jwtToken);
  }

  getUser(jwtToken: string): any {
    // get payload in the jwt token
    const results: TokenPayload = this.getDecodeToken(jwtToken);
    const {id, email} = results;
    return {id, email};
  }

  getExpiryTime(jwtToken: string) {
    const decodedToken: TokenPayload = this.getDecodeToken(jwtToken);
    return decodedToken ? decodedToken.exp : null;
  }

  isTokenExpired(jwtToken: string): boolean {
    const expiryTime: number = Number(this.getExpiryTime(jwtToken));
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}