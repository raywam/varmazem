import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContractCancelamentoDialogComponent } from 'src/app/components/contract-cancelamento-dialog/contract-cancelamento-dialog.component';
import { Client } from 'src/app/resources/models/client';
import { Contract } from 'src/app/resources/models/contract';
import { ClientService } from 'src/app/resources/services/client.service';
import { ContractService } from 'src/app/resources/services/contract.service';
import faker from 'faker-br';
import date  from 'src/app/resources/utils/date';
import { ChargeDialogComponent } from 'src/app/components/charge-dialog/charge-dialog.component';
import utils from 'src/app/resources/utils/date';
import { DatePipe } from '@angular/common';
import { SnackbarService } from 'src/app/resources/services/snackbar.service';
import { PaymentService } from 'src/app/resources/services/payment.service';
import { SpinnerOverlayService } from 'src/app/resources/services/spinner-overlay.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'client', 'status', 'action'];
  pipe = new DatePipe('en-US');
  searchClient = new FormControl('');
  client = new FormControl('');
  isNew: boolean = false;
  public contracts: Contract[] = [];
  public contract: Contract;
  public clients: Client[];
  public objsContracao = [
    'Armazenagem',
    'Consultoria',
    'Outros'
  ]

  contractForm = new FormGroup({
    clientUid: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    dataInicio: new FormControl(this.pipe.transform(Date.now(), 'dd/MM/yyyy'), Validators.required),
    dataAssinatura: new FormControl(this.pipe.transform(Date.now(), 'dd/MM/yyyy'), Validators.required),
    dataPublicacao: new FormControl(this.pipe.transform(Date.now(), 'dd/MM/yyyy'), Validators.required),
    dataInicioVigencia: new FormControl(this.pipe.transform(Date.now(), 'dd/MM/yyyy'), Validators.required),
    dataFimVigencia: new FormControl(this.pipe.transform(Date.now(), 'dd/MM/yyyy'), Validators.required),
    objContracao: new FormControl('', Validators.required),
    prazo: new FormControl('', Validators.required)
  })

  constructor(
    private clientService: ClientService,
    private contractService: ContractService,
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private paymentService: PaymentService,
    private spinnerService: SpinnerOverlayService,
  ) { }

  ngOnInit(): void {
    this.getClients({ first: true });
    this.contract = this.contracts[0];
  }

  getClients({ first }) {
    this.spinnerService.show();
    this.clientService.getClients().subscribe(res => {
      this.clients = res.data.filter(client => !client.deleted);
      this.getContracts(res.data, first);
    }, error => this.spinnerService.hide());
  }

  getContracts(clients, first) {
    this.contractService.getContracts().subscribe(res => {
      if (res.success) {
        const contracts = res.data.filter(contract => !contract.deleted );
        this.contracts = [];
        this.contracts = this.contractService.contractsWithClient(contracts, clients);

        if (first) this.contract = this.contracts[0];
      }

      this.spinnerService.hide();
    }, error => this.spinnerService.hide());
  }

  getStatusDescription(statusId) {
    const status = {
      1: 'Aprovado',
      2: 'Pagamento Pendente',
      3: 'Cancelado',
    }

    return status[statusId];
  }

  setContract(contract) {
    this.contract = contract;
    this.isNew = false;
  }

  openCancelContract() {
    const dialogRef = this.dialog.open(ContractCancelamentoDialogComponent, {
      width: '400px',
      data: {
        contract: this.contract
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.cancell) {
        const contract = {
          ...this.contract,
          dataCancelamento: date.getDate(),
          statusId: 3,
          motivoCancelamento: result.motivoCancelamento
        }

        this.spinnerService.show();
        this.contractService.cancelContract(contract).subscribe(res => {
          if (res.success) {
            this.getClients({ first: false });
            this.contract = contract;
          }

          this.spinnerService.hide();
          this.snackbar.openSnackBar(res.msg, 'Fechar');
        }, error => this.spinnerService.hide())

        this.getClients({ first: false });
      }
    });
  }

  openChargePayment() {
    const dialogRef = this.dialog.open(ChargeDialogComponent, {
      width: '400px',
      data: {
        contract: this.contract
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        const chargeData = result.chargeData;

        const payment = {
          ...chargeData,
          contractUid: this.contract.uuid,
          pago: false,
          cnpj: this.contract.client.cnpj,
          email: this.contract.client.email,
        }

        this.spinnerService.show();
        this.paymentService.postPayments(payment).subscribe(res => {
          if (res.success) {
            this.contract.pagamentos.push(payment);
            this.getClients({ first: false });
          }

          this.spinnerService.hide();
          this.snackbar.openSnackBar(res.msg, 'Fechar');
        }, error => this.spinnerService.hide())
      }
    });
  }

  saveContrato(save: boolean) {
    if (save) {
      const contract: Contract = this.contractForm.value;
      this.spinnerService.show();
      this.contractService.setContract(contract).subscribe(res => {
        if (res.success) {
          this.snackbar.openSnackBar('Contrato cadastrado com sucesso!', 'Fechar');
          this.getClients({ first: true });
        }
        this.spinnerService.hide();
      }, error => this.spinnerService.hide());
    }

    this.isNew = false;
  }

  formatDate(element) {
    const { currentTarget: { name } } = element;
    const value = this.contractForm.controls[name].value

    this.contractForm.patchValue({
      [name]: utils.formatDate(value),
    });
  }

  newContract() {
    this.contract = null;
    this.isNew = true;
  }

  getStatusColor(statusId) {
    const status = {
      1: 'green',
      2: 'yellow',
      3: 'red',
    }

    return status[statusId];
  }

  formatPrazoDate(date) {
    return this.pipe.transform(date, 'dd/MM/yyyy')
  }
}
