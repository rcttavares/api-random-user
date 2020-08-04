import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendedComponent } from './attended.component';

describe('AttendedComponent', () => {
  let component: AttendedComponent;
  let fixture: ComponentFixture<AttendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
