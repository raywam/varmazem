import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'src/app/resources/models/contract';

@Component({
  selector: 'app-contract-cancelamento-dialog',
  templateUrl: './contract-cancelamento-dialog.component.html',
  styleUrls: ['./contract-cancelamento-dialog.component.scss']
})
export class ContractCancelamentoDialogComponent implements OnInit {
  public motivoCancelamento = new FormControl('');
  contract: Contract;

  constructor(
    public dialogRef: MatDialogRef<ContractCancelamentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.contract = this.data.contract;
    // console.log(this.data);
  }

  isDisabled() {
    return !!this.motivoCancelamento.value
  }

  confirmCancell(cancell: boolean) {
    this.dialogRef.close({ cancell, motivoCancelamento: this.motivoCancelamento.value })
  }

}
