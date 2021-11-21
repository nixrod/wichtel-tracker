import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistFormComponent } from './wishlist-form/wishlist-form.component';
import { FormSuccessComponent } from './form-success/form-success.component';
import { AppComponent } from './app.component';
import { AssignmentComponent } from './assignment/assignment.component';


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'wishlist', component: WishlistFormComponent},
  {path: 'assignment', component: AssignmentComponent},
  {path: 'success', component: FormSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
