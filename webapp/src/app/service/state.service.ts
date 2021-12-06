import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from '../model/state';
import { Routes } from './routes';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) {
  }

  getState(): Observable<State> {
    return this.http.get<State>(Routes.state);
  }


}
