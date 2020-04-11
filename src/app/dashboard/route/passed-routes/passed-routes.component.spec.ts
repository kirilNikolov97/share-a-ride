import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedRoutesComponent } from './passed-routes.component';

describe('PassedRoutesComponent', () => {
  let component: PassedRoutesComponent;
  let fixture: ComponentFixture<PassedRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassedRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
