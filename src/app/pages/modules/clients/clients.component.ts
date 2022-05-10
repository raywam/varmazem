import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/resources/models/client';
import { ClientService } from 'src/app/resources/services/client.service';
import mask from '../../../resources/utils/mask'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ClientComponent } from 'src/app/components/client/client.component';

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
  public clients: Client[] = [];
  public client: Client;

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clients = this.clientService.getClients();
  }

  search() {
    const name = this.searchClient.value;

    if (name) {
      this.clients = this.clientService.filterByName(name)
    } else {
      this.getClients();
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
