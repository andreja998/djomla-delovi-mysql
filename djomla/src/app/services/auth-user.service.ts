import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(Username: string, Password: string): Observable<any> {
    return this.http.post(this.url + 'login', { username: Username, password: Password }).pipe(map((res) => {
      console.log(res);
      if (res['token']) {
        localStorage.setItem('token', res['token']);
      }
    }));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

}
