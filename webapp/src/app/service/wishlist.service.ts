import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Wishlist} from "../model/wishlist";
import {Routes} from "./routes";
import {Observable} from "rxjs";
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  constructor(private http: HttpClient,
              private loginService: LoginService) {

  }

  sendWishlist(wishlist: Wishlist): Observable<Wishlist> {
    return this.http.post<Wishlist>(Routes.wishlists, wishlist, this.loginService.getCreadentialHeader());
  }
}
