import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient
  ) {
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, payload: any): Observable<T> {
    return this.http.post<T>(url, payload);
  }

  put<T>(url: string, payload: any): Observable<T> {
    return this.http.put<T>(url, payload);
  }

  patch<T>(url:string, payload: any): Observable<T> {
    return this.http.patch<T>(url, payload);
  }

  delete() {

  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.error(error.message);
      alert(error.error.error.message);
      console.error(error);
      console.error(
        `Backend returned code ${error.status}`+
        `body was: ${JSON.stringify(error.error.error.message)}`
      );
    }

    return throwError('Something bad happened; please try again later');
  }
}