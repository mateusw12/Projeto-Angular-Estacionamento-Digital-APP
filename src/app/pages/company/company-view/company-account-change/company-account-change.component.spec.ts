import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountChangeComponent } from './company-account-change.component';

describe('CompanyAccountChangeComponent', () => {
  let component: CompanyAccountChangeComponent;
  let fixture: ComponentFixture<CompanyAccountChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAccountChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAccountChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
