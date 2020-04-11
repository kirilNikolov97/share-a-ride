import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeDriverComponent } from './become-driver.component';

describe('BecomeDriverComponent', () => {
  let component: BecomeDriverComponent;
  let fixture: ComponentFixture<BecomeDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
