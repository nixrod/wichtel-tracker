import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WishlistFormComponent } from './wishlist-form.component';

describe('WishlistFormComponent', () => {
  let component: WishlistFormComponent;
  let fixture: ComponentFixture<WishlistFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WishlistFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
