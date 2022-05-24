import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/resources/services/payment.service';
import { SpinnerOverlayService } from 'src/app/resources/services/spinner-overlay.service';

@Component({
  selector: 'app-charge-payments',
  templateUrl: './charge-payments.component.html',
  styleUrls: ['./charge-payments.component.scss']
})
export class ChargePaymentsComponent implements OnInit {
  pipe = new DatePipe('en-US');
  dash = {};
  payments = [];
  paymentsFilter = [];
  showing = 'Todos';
  statusDescription = {
    1: 'Recebido',
    2: 'A Receber',
    3: 'Vencido'
  }

  statusColor = {
    1: '#3ab73d',
    2: '#ffd73f',
    3: '#f44335'
  }

  constructor(
    private paymentService: PaymentService,
    private spinnerService: SpinnerOverlayService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.getPayments();
  }

  getPayments() {
    this.paymentService.getPayments().subscribe(res => {
      if (res.success) {
        this.payments = res.data;
        this.paymentsFilter = res.data;
        this.dashGenerate();
      }

      this.spinnerService.hide();
    }, error => this.spinnerService.hide())
  }

  formatDate(date, format) {
    return this.pipe.transform(date, format)
  }

  getStatusDescription(statusId, prazo) {
    if (statusId !== 1 && this.checkIsExpired(prazo)) {
      return this.statusDescription[3];
    }

    return this.statusDescription[statusId];
  }

  getStatusColor(statusId, prazo) {
    if (statusId !== 1 && this.checkIsExpired(prazo)) {
      return this.statusColor[3];
    }

    return this.statusColor[statusId];
  }

  setFilter(filter, showing) {
    if (filter) {
      this.paymentsFilter = this.dash[filter].payments;
      this.showing = showing;
    } else {
      this.paymentsFilter = this.payments;
      this.showing = 'Todos';
    }
  }

  dashGenerate() {
    const dash = {
      expired: {
        total: 0,
        payments: []
      },
      received: {
        total: 0,
        payments: []
      },
      toReceive: {
        total: 0,
        payments: []
      },
    };

    this.payments.map(payment => {
      const valor = parseInt(payment.valor);
      console.log(valor);
      if (this.checkIsExpired(payment.prazo)) {
        dash.expired.total += valor;
        dash.expired.payments.push(payment);
      } else if (payment.statusId === 1) {
        dash.received.total += valor;
        dash.received.payments.push(payment);
      } else if (payment.statusId === 2) {
        dash.toReceive.total += valor;
        dash.toReceive.payments.push(payment);
      }
    })

    console.log(dash);
    this.dash = dash;
  }

  checkIsExpired(date) {
    return new Date(date) < new Date();
  }

}
