import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRouteComponent } from './review-route.component';

describe('ReviewRouteComponent', () => {
  let component: ReviewRouteComponent;
  let fixture: ComponentFixture<ReviewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
