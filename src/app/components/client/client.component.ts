import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/resources/models/client';
import { ClientService } from 'src/app/resources/services/client.service';
import faker from 'faker-br';
import { SnackbarService } from 'src/app/resources/services/snackbar.service';
import { CorreiosService } from 'src/app/resources/services/correios.service';
import { SpinnerOverlayService } from 'src/app/resources/services/spinner-overlay.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() public client: Client = {};
  @Input() public isNew: boolean = false;
  @Output() getClients = new EventEmitter<string>();

  clientForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cnpj: new FormControl('', Validators.required),
    inscricaoEstadual: new FormControl('', Validators.required),
    site: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    cep: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
  })

  public isDeleting: Boolean = false;
  public isEditing: Boolean = false;

  constructor(
    private clientService: ClientService,
    private snackbar: SnackbarService,
    private correiosService: CorreiosService,
    private spinnerService: SpinnerOverlayService) { }

  ngOnInit(): void {
    console.log(this.client)
  }

  clearClient(): void {
    this.clientForm.reset()
  }

  getCEPData() {
    const CEP = this.clientForm.controls['cep'].value
    if (CEP && CEP.length === 8) {
      this.correiosService.getData(CEP).subscribe(res => {
        if (res) {
          this.clientForm.patchValue({
            endereco: res.logradouro,
            bairro: res.bairro,
            cidade: res.localidade,
            estado: res.uf,
          });
        }
      });
    }
  }

  confirmDelete(confirm) {
    if (confirm) {
      this.spinnerService.show();
      this.clientService.deleteCliente(this.client).subscribe(res => {
        if (res.success) {
          this.getClients.emit();
          this.client = null;
        }

        this.snackbar.openSnackBar(res.msg, 'Fechar');
        this.spinnerService.hide();
      }, error => this.spinnerService.hide());
    }

    this.isDeleting = false;
  }

  cancellClient() {
    this.isNew = false;
    this.isEditing = false;
  }

  editClient() {
    this.isEditing = true;
    this.clientForm.patchValue(this.client)
  }

  setClient() {
    if (this.clientForm.valid) {
      const client: Client = this.clientForm.value;

      if (this.isEditing) {
        client.uuid = this.client.uuid;

        const clientPatch = {
          ...this.client,
          ...client
        }

        this.spinnerService.show();
        this.clientService.editCliente(clientPatch).subscribe(res => {
          if (res.success) {
            this.getClients.emit();
          }

          this.snackbar.openSnackBar(res.msg, 'Fechar');
          this.spinnerService.hide();
        }, err => this.spinnerService.hide());
      } else {
        client.active = true;
        client.deleted = false;

        this.client = client;
        this.spinnerService.show();
        this.clientService.setClient(client).subscribe(res => {
          if (res.success) {
            this.getClients.emit();
          }

          this.spinnerService.hide();
          this.snackbar.openSnackBar(res.msg, 'Fechar');
        }, error => this.spinnerService.hide());
      }

      this.isEditing = false;
      this.isNew = false;
    }

    console.log(this.clientService.getClients())
  }

  setDeleteIntent() {
    this.isDeleting = true;
  }
}
