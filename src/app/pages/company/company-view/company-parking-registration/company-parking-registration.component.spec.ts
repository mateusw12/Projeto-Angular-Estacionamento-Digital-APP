import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyParkingRegistrationComponent } from './company-parking-registration.component';

describe('CompanyParkingRegistrationComponent', () => {
  let component: CompanyParkingRegistrationComponent;
  let fixture: ComponentFixture<CompanyParkingRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyParkingRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyParkingRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
