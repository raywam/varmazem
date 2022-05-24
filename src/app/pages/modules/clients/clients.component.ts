import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/resources/models/client';
import { ClientService } from 'src/app/resources/services/client.service';
import mask from '../../../resources/utils/mask'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ClientComponent } from 'src/app/components/client/client.component';
import { SpinnerOverlayService } from 'src/app/resources/services/spinner-overlay.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild(ClientComponent) clientComponent: ClientComponent;

  displayedColumns: string[] = ['nome', 'cnpj', 'action'];
  searchClient = new FormControl('');

  public isNew: boolean = false;
  public clientsFilter: Client[] = [];
  public clients: Client[] = [];
  public client: Client;

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    private spinnerService: SpinnerOverlayService
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.client = this.clients[0];
  }

  getClients(): void {
    this.spinnerService.show();
    this.clientService.getClients().subscribe(res => {
      this.clients = res.data.filter(client => !client.deleted);
      this.clientsFilter = this.clients;
      this.client = this.clients[0]
      this.spinnerService.hide();
    }, error => this.spinnerService.hide());
  }

  search() {
    const name = this.searchClient.value;
    
    if (name) {
      this.clientsFilter = [ ...this.clients.filter(client => !client.deleted && client.nome.toLowerCase().search(name) >= 0) ]
    } else {
      this.clientsFilter = this.clients;
    }
  }

  setIsNew() {
    this.isNew = !this.isNew;
    this.clientComponent.clearClient();
  }

  openClientDialog(client) {
    this.client = client;
    this.isNew = false;
  }

  public formatCNPJ(cnpj): void {
    return mask.formatCNPJ(cnpj)
  }
}
