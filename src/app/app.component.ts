import { Component } from '@angular/core';
import { LoginService } from './resources/services/login.service';
import { SpinnerOverlayService } from './resources/services/spinner-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'varmazem';
  showSpinner = false;
  authenticated = false;

  constructor(
    private spinnerService : SpinnerOverlayService,
    private loginService: LoginService, ) {
    this.spinnerService.loading.subscribe(res => this.showSpinner = res);
    this.loginService.authenticated.subscribe(res => this.authenticated = res);
  }

  logout() {
    this.loginService.logoutUser();
  }
}
