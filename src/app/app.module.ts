import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/modules/clients/clients.component';
import { OrdersComponent } from './pages/modules/orders/orders.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ClientComponent } from './components/client/client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ContractsComponent } from './pages/modules/contracts/contracts.component';
import { ContractCancelamentoDialogComponent } from './components/contract-cancelamento-dialog/contract-cancelamento-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChargeDialogComponent } from './components/charge-dialog/charge-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChargePaymentsComponent } from './pages/modules/charge-payments/charge-payments.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './resources/guards/auth.guard';
import { TokenInterceptorService } from './resources/services/interceptors/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    OrdersComponent,
    ClientComponent,
    ContractsComponent,
    ContractCancelamentoDialogComponent,
    ChargeDialogComponent,
    ChargePaymentsComponent,
    SpinnerComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonToggleModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
