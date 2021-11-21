import { Component, OnInit } from '@angular/core';
import { StateService } from './service/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private stateService: StateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.stateService.getState().subscribe(state => {
      if (state.state === 'WISHES_OPEN') {
        this.router.navigate(['/wishlist'], {queryParamsHandling: 'preserve'});
      } else if (state.state === 'WISHES_CLOSED') {
        this.router.navigate(['/assignment'], {queryParamsHandling: 'preserve'});
      }
    });
  }


}
