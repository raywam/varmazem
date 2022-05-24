import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.loginService.getToken()
    console.log(token);
    if (token && state.url === '/login') {
      this.router.navigate(['/home']);
      return false;
    }

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
