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

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'client', 'status', 'action'];
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
    dataInicio: new FormControl('', Validators.required),
    dataAssinatura: new FormControl('', Validators.required),
    dataPublicacao: new FormControl('', Validators.required),
    dataInicioVigencia: new FormControl('', Validators.required),
    dataFimVigencia: new FormControl('', Validators.required),
    objContracao: new FormControl('', Validators.required),
    prazo: new FormControl('', Validators.required)
  })

  constructor(
    private clientService: ClientService,
    private contractService: ContractService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getContracts();
    this.getClients();
  }

  getClients() {
    this.clients = this.clientService.getClients();
  }

  getContracts() {
    this.contracts = this.contractService.getContracts();
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
        this.contract.dataCancelamento = date.getDate();
        this.contract.statusId = 3;
        this.contract.motivoCancelamento = result.motivoCancelamento;

        this.contractService.cancellContract(this.contract);
        this.getContracts();
      }
    });
  }

  saveContrato(save: boolean) {
    if (save) {
      const contract: Contract = this.contractForm.value;
      this.contractService.setContract(contract);
      this.getContracts();
      this.contract = this.contracts[0];
    }

    this.isNew = false;
  }

  formatDate(element) {
    const { currentTarget: { name } } = element;
    let v = this.contractForm.controls[name].value

    if (v.match(/^\d{2}$/) !== null) {
        v = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        v = v + '/';
    }

    this.contractForm.patchValue({
      [name]: v,
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

}
