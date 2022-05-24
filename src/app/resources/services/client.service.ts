import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import clients from '../../../assets/data/clients.js'
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = `${environment.varmazemAPI}/client`

  httpOptions;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService) {
    this.buildHttpOptions();
  }

  buildHttpOptions() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

    this.httpOptions = headers;
  }

  getClients(): Observable<any> {
    return this.httpClient.get<any[]>(this.url).pipe()
  }

  setClient(client: Client): Observable<any>  {
    return this.httpClient.post<any[]>(this.url, { client }).pipe()
  }

  deleteCliente(client: Client): Observable<any> {
    client.active = false;
    client.deleted = true;

    return this.httpClient.put<any[]>(this.url, { client }).pipe()
  }

  editCliente(client: Client): Observable<any>  {
    return this.httpClient.put<any[]>(this.url, { client }).pipe()
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
