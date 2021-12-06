import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist-form',
  templateUrl: './wishlist-form.component.html',
  styleUrls: ['./wishlist-form.component.scss']
})
export class WishlistFormComponent implements OnInit {

  accessId: string;
  user: User;
  wishlistForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.user = new User();
    this.wishlistForm = new FormGroup({
      name: new FormControl({value: this.user.name, disabled: true}, []),
      wishList: new FormControl(this.user.wishes, [
        Validators.required,
        Validators.maxLength(5000)
      ]),
      address: new FormControl(this.user.address, [
        Validators.required,
        Validators.maxLength(5000)
      ])
    });

  }

  ngOnInit() {
    this.accessId = this.activatedRoute.snapshot.queryParamMap.get('accessId');

    this.userService.getUser(this.accessId)
      .subscribe(user => {
        this.user.name = user.name;
        this.user.wishes = user.wishes;
        this.user.address = user.address;
      });
  }


  get name(): AbstractControl {
    return this.wishlistForm.get('name');
  }

  get wishList(): AbstractControl {
    return this.wishlistForm.get('wishList');
  }

  get address(): AbstractControl {
    return this.wishlistForm.get('address');
  }

  onSubmit(data) {

    if (this.wishlistForm.invalid) {
      return;
    }

    let updatedUser = new User();
    updatedUser.address = data.address;
    updatedUser.wishes = data.wishList;

    this.userService.updateUser(this.accessId, updatedUser)
      .subscribe(() => {
        this.router.navigate(['/success'], {queryParamsHandling: 'preserve'});
      }, err => {
        this._snackBar.open('Server error:' + err.error, null, {
          duration: 5000,
          panelClass: 'snackbar-warn'
        });
      });
  }

}
