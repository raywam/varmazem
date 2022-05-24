import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargePaymentsComponent } from './charge-payments.component';

describe('ChargePaymentsComponent', () => {
  let component: ChargePaymentsComponent;
  let fixture: ComponentFixture<ChargePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
