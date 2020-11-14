import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';
import { Routes } from './routes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  verifiyCredentials() {
    return this.http.get<User[]>(Routes.users, this.getCreadentialHeader())
  }

  getCreadentialHeader() {
    let username = this.cookieService.get('username');
    let password = this.cookieService.get('password');

    return {
      headers: new HttpHeaders({
        'Authorization': "Basic " + btoa(username + ':' + password)
      })
    };
  }

}
