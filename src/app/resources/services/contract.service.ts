import { Injectable } from '@angular/core';
import contracts from '../../../assets/data/contracts.js'
import { Contract } from '../models/contract';
import { ClientService } from './client.service.js';
import faker from 'faker-br';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  contracts: Contract[] = contracts;

  constructor(
    private clientService: ClientService
  ) { }

  contractsWithClient(contracts) {
    const clients = this.clientService.getAllClients();

    const contractsAux = contracts.map(contract => {
      return {
        ...contract,
        client: clients.find(client => client.uid === contract.clientUid)
      }
    })

    return contractsAux;
  }

  getContracts() {
    const contracts = this.contracts.filter(contract => !contract.deleted );

    return this.contractsWithClient(contracts);
  }

  setContract(contract: Contract) {
    contract.uid = faker.random.uuid();
    contract.active = true;
    contract.deleted = false;
    contract.numero = faker.random.number();
    contract.statusId = 2;
    contract.pagamentos = [];

    this.contracts.unshift(contract)

    return contract;
  }

  cancellContract(contractDeleting: Contract) {
    const contractsAux = this.contracts.map(contract => {
      if (contract.uid === contractDeleting.uid) {
        return {
          ...contract,
          ...contractDeleting
        }
      }

      return contract;
    })

    this.contracts = contractsAux;
  }

  editContract(contractEditing: Contract) {
    const contractsAux = this.contracts.map(contract => {
      if (contract.uid === contractEditing.uid) {
        return {
          ...contract,
          ...contractEditing
        }
      }

      return contract;
    });

    this.contracts = contractsAux;
  }

  filterByNumber(numero) {
    const result = [ ...this.contracts.filter(contract => contract.numero === numero) ]

    return result;
  }

  totalActiveContracts() {
    return this.contracts.filter(contract => contract.active && !contract.deleted ).length;
  }

  totalContracts() {
    return this.getContracts().length;
  }
}
