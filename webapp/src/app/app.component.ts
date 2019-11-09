import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {User} from "./model/user";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[];
  checkoutForm;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {

    this.checkoutForm = this.formBuilder.group({
      userId: '',
      email: '',
      wishList: '',
      partnerId: ''
    });
  }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
        console.log('fetched users', users);
      });
  }


  onSubmit(data) {
    // Process checkout data here
    console.warn('Your order has been submitted', data);

    this.checkoutForm.reset();
  }
}
