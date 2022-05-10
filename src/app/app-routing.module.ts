import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/modules/clients/clients.component';
import { ContractsComponent } from './pages/modules/contracts/contracts.component';
import { OrdersComponent } from './pages/modules/orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'module/clients', component: ClientsComponent },
  { path: 'module/orders', component: OrdersComponent },
  { path: 'module/contracts', component: ContractsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
