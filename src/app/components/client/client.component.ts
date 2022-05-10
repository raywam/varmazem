import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/resources/models/client';
import { ClientService } from 'src/app/resources/services/client.service';
import faker from 'faker-br';

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

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    console.log(this.client)
  }

  clearClient(): void {
    this.clientForm.reset()
  }

  confirmDelete(confirm) {
    if (confirm) {
      this.clientService.deleteCliente(this.client);
      this.getClients.emit();
      this.client = null;
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
        client.uid = this.client.uid;
        this.client = this.clientService.editCliente(client);
      } else {
        client.uid = faker.random.uuid();
        client.active = true;
        client.deleted = false;

        this.client = client;
        this.clientService.setClient(client);
      }

      this.getClients.emit();
      this.isEditing = false;
      this.isNew = false;
    }

    console.log(this.clientService.getClients())
  }

  setDeleteIntent() {
    this.isDeleting = true;
  }
}
