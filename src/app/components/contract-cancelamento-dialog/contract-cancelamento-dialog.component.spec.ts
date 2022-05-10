import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCancelamentoDialogComponent } from './contract-cancelamento-dialog.component';

describe('ContractCancelamentoDialogComponent', () => {
  let component: ContractCancelamentoDialogComponent;
  let fixture: ComponentFixture<ContractCancelamentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractCancelamentoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCancelamentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
