import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import clients from '../../../assets/data/clients.js'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: Client[] = clients;

  constructor() { }

  getClients() {
    return this.clients.filter(client => !client.deleted );
  }

  getAllClients() {
    return this.clients;
  }

  setClient(client: Client) {
    this.clients.unshift(client)
  }

  deleteCliente(clientDeleting: Client) {
    this.clients.map(client => {
      if (client.uid === clientDeleting.uid) {
        client.deleted = true;
      }
    })
  }

  editCliente(clientEditing: Client) {
    let clientAux;

    const clientsAux = this.clients.map(client => {
      if (client.uid === clientEditing.uid) {
        clientAux = {
          ...client,
          ...clientEditing
        }

        return clientAux;
      }

      return client;
    });

    this.clients = clientsAux;

    return clientAux;
  }

  filterByName(name) {
    const result = [ ...this.clients.filter(client => !client.deleted && client.nome.toLowerCase().search(name) >= 0) ]

    return result;
  }

  totalActiveClients() {
    return this.clients.filter(client => client.active && !client.deleted ).length;
  }

  totalClients() {
    return this.getClients().length;
  }
}
