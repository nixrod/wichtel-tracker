import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {Routes} from "./routes";
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient,
              private loginService: LoginService) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(Routes.users, this.loginService.getCreadentialHeader());
  }

}
