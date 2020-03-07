import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  url = 'http://prodajaautodelova.rs/back/api/';
  roleSubject: BehaviorSubject<string>;
  public role: Observable<string>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.roleSubject = new BehaviorSubject<string>(this.getRole());
    this.role = this.roleSubject.asObservable();
  }

  login(Username: string, Password: string): Observable<any> {
    return this.http.post(this.url + 'login', { username: Username, password: Password }).pipe(
      map(res => {
        console.log(res);
        if (res['token']) {
          localStorage.setItem('token', res['token']);
          this.roleSubject.next(this.getRole());
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.roleSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  getRole() {
    let role = null;
    if (this.isAuthenticated()) {
      const tok = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      role = tok['role'];
    }

    return role;
  }
}
