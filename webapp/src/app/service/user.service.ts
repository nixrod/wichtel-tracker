import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Routes } from './routes';
import { Assignment } from '../model/assignment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  getUser(accessId: string): Observable<User> {
    return this.http.get<User>(Routes.users + '/' + accessId);
  }

  updateUser(accessId: string, user: User): Observable<string> {
    return this.http.put<string>(Routes.users + `/${accessId}`, {address: user.address, wishes: user.wishes});
  }

  getUserAssignment(accessId: string): Observable<Assignment> {
    return this.http.get<Assignment>(Routes.users + '/' + accessId + '/assignment');
  }
}
