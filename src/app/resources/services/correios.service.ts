import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry,  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {
  httpOptions;

  constructor(private httpClient: HttpClient) {
    this.buildHttpOptions();
  }

  buildHttpOptions() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

    this.httpOptions = headers;
  }

  getData(CEP): Observable<any> {
    return this.httpClient.get<any[]>(`http://viacep.com.br/ws/${CEP}/json/`).pipe()
  }
}
