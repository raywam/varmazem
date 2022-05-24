import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  httpOptions;
  url = `${environment.varmazemAPI}/payments/charge`

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

  getPayments(): Observable<any> {
    return this.httpClient.get<any[]>(this.url).pipe()
  }

  postPayments(chargePayment): Observable<any> {
    return this.httpClient.post<any[]>(this.url, { chargePayment }).pipe()
  }
}
