import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'src/app/resources/models/contract';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import utils from 'src/app/resources/utils/date';

@Component({
  selector: 'app-charge-dialog',
  templateUrl: './charge-dialog.component.html',
  styleUrls: ['./charge-dialog.component.scss']
})
export class ChargeDialogComponent implements OnInit {
  pipe = new DatePipe('en-US');

  contract: Contract;

  chargePaymentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChargeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.contract = this.data.contract;
    this.buildForm();
    // console.log(this.data);
  }

  buildForm() {
    this.chargePaymentForm = new FormGroup({
      valor: new FormControl(this.contract.valor, Validators.required),
      prazo: new FormControl(new Date(), Validators.required),
      observacao: new FormControl('', Validators.required),
    })

  }

  isDisabled() {
    //return !!this.motivoCancelamento.value
  }

  confirmCharge(confirm: boolean) {
    // console.log(this.chargePaymentForm.value)
    this.dialogRef.close({ confirm, chargeData: this.chargePaymentForm.value })
  }

  formatDate(element) {
    const { currentTarget: { name } } = element;
    const value = this.chargePaymentForm.controls[name].value

    this.chargePaymentForm.patchValue({
      [name]: utils.formatDate(value),
    });
  }

}
