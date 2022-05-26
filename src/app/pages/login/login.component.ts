import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/resources/services/login.service';
import { SnackbarService } from 'src/app/resources/services/snackbar.service';
import { SpinnerOverlayService } from 'src/app/resources/services/spinner-overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message = ""
  loginForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.email),
    password: new FormControl('')
  })

  constructor(
    private spinnerService: SpinnerOverlayService,
    private authService: LoginService,
    private router: Router,
    private snackbar: SnackbarService) { }

  ngOnInit() {
    this.verifyToken();
  }

  verifyToken() {
    const token = this.authService.getToken();

    if (token) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.message = '';
    const loginData = this.loginForm.value
    this.spinnerService.show();
    this.authService.login(loginData).subscribe(res => {
      if (res.success) {
        this.authService.setToken(res.data.token);
        this.authService.authenticateUser();
        this.router.navigate(['/home']);
      } else {
        this.message = res.msg;
      }

      this.snackbar.openSnackBar(res.msg, 'Fechar');
      this.spinnerService.hide();
    }, error => {
      // console.log(error);
      this.spinnerService.hide()
      this.message = "Usuário inválido. Tente novamente.";
    })
  }

}
