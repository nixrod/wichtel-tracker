import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WishlistFormComponent} from "./wishlist-form/wishlist-form.component";
import {FormSuccessComponent} from "./form-success/form-success.component";
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'wishlist', component: WishlistFormComponent},
  {path: 'success', component: FormSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
