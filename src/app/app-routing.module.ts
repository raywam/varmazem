import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ChargePaymentsComponent } from './pages/modules/charge-payments/charge-payments.component';
import { ClientsComponent } from './pages/modules/clients/clients.component';
import { ContractsComponent } from './pages/modules/contracts/contracts.component';
import { AuthGuard } from './resources/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'module/clients', component: ClientsComponent, canActivate: [AuthGuard]  },
  { path: 'module/charge-payments', component: ChargePaymentsComponent, canActivate: [AuthGuard]  },
  { path: 'module/contracts', component: ContractsComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
