import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SpinnerOverlayService } from './spinner-overlay.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = `${environment.varmazemAPI}/user/login`
  token;

  httpOptions;

  authenticated = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    this.buildHttpOptions();
    const token = this.getToken();

    if (token) {
      this.authenticated.next(true);
    }
  }

  buildHttpOptions() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

    this.httpOptions = headers;
  }

  login(data): Observable<any> {
    return this.httpClient.post<any>(this.url, data).pipe()
  }

  authenticateUser() {
    this.authenticated.next(true);
  }

  logoutUser() {
    this.token = '';
    this.authenticated.next(false);
    this.setToken('');
    this.router.navigate(['/home']);
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token ? this.token : localStorage.getItem('token');
  }
}
