import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {WishlistService} from "../service/wishlist.service";
import {MatSnackBar} from "@angular/material";
import {User} from "../model/user";
import {Wishlist} from "../model/wishlist";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wishlist-form',
  templateUrl: './wishlist-form.component.html',
  styleUrls: ['./wishlist-form.component.scss']
})
export class WishlistFormComponent implements OnInit {

  users: User[];
  wishlistForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private wishlistService: WishlistService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.wishlistForm = new FormGroup({
      userId: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      wishList: new FormControl('', [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      partnerId: new FormControl('', [
        Validators.required,
        this.duplicatePersonValidator()
      ])
    });

  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  duplicatePersonValidator(): ValidatorFn {
    return (): { [key: string]: any } | null => {

      let duplicate = false;
      if (this.wishlistForm) {
        let userId = this.wishlistForm.get('userId').value;
        let partnerId = this.wishlistForm.get('partnerId').value;

        if (userId === partnerId) {
          duplicate = true;
        }
      }

      return duplicate ? {'duplicatePerson': {value: true}} : null;
    };
  }

  get userId(): AbstractControl {
    return this.wishlistForm.get('userId');
  }

  get email(): AbstractControl {
    return this.wishlistForm.get('email');
  }

  get wishList(): AbstractControl {
    return this.wishlistForm.get('wishList');
  }

  get partnerId(): AbstractControl {
    return this.wishlistForm.get('partnerId');
  }


  onSubmit(data) {

    if (this.wishlistForm.invalid) {
      return;
    }

    let wishListData = new Wishlist(data.email, data.wishList, data.userId, data.partnerId);
    this.wishlistService.sendWishlist(wishListData)
      .subscribe(() => {
        this.router.navigate(['/success']);
      }, err => {
        this._snackBar.open('Server error:' + err.error, null, {
          duration: 5000,
          panelClass: 'snackbar-warn'
        });
      });
  }

}
