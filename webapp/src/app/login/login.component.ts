import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private cookieService: CookieService,
              private loginService: LoginService,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      pass: new FormControl('', [])
    });

    if (this.cookieService.get('username') && this.cookieService.get('password')) {
      this.verifyCredentials();
    }
  }

  onSubmit(data) {
    this.cookieService.set('username', 'user');
    this.cookieService.set('password', data.pass);

    this.verifyCredentials();
  }

  private verifyCredentials() {
    this.loginService.verifiyCredentials().subscribe(() => {
      this.router.navigate(['/wishlist']);
    }, err => {
      this.cookieService.delete('username');
      this.cookieService.delete('password');

      this._snackBar.open('Invalid password', null, {
        duration: 5000,
        panelClass: 'snackbar-warn'
      });
    })
  }

}
