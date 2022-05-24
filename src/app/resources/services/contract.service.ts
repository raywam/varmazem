import { Injectable } from '@angular/core';
import contracts from '../../../assets/data/contracts.js'
import { Contract } from '../models/contract';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import faker from 'faker-br';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  url = `${environment.varmazemAPI}/contract`
  contracts: Contract[] = contracts;
  httpOptions;

  constructor(
    private httpClient: HttpClient
  ) {
    this.buildHttpOptions();
  }

  buildHttpOptions() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

    this.httpOptions = headers;
  }

  contractsWithClient(contracts, clients) {
    const contractsAux = contracts.map(contract => {
      return {
        ...contract,
        client: clients.find(client => client.uuid === contract.clientUid)
      }
    })

    return contractsAux;
  }

  getContracts(): Observable<any> {
    return this.httpClient.get<any[]>(this.url).pipe()
      .pipe()
  }

  setContract(contract: Contract): Observable<any> {
    contract.numero = faker.random.number();

    return this.httpClient.post<any[]>(this.url, { contract }).pipe()
  }

  cancelContract(contract: Contract): Observable<any>  {
    const contractAux = { ...contract };
    delete contractAux.client;

    return this.httpClient.put<any[]>(this.url, { contract }).pipe()
  }

  setContractPayment(contractEditing: Contract, payment) {
    const contractsAux = this.contracts.map(contract => {
      if (contract.uuid === contractEditing.uuid) {
        return {
          ...contract,
          pagamentos: [
            payment
          ]
        }
      }

      return contract;
    });

    this.contracts = contractsAux;
  }

  editContract(contractEditing: Contract) {
    const contractsAux = this.contracts.map(contract => {
      if (contract.uuid === contractEditing.uuid) {
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
    //return this.getContracts().length;
  }
}
