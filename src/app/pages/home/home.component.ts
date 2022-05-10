import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/resources/services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalActiveClients: number = 0;
  totalClients: number = 0;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.totalActiveClients = this.clientService.totalActiveClients();
    this.totalClients = this.clientService.totalClients();
  }

  public getActiveClientPercent() {
    return Math.round(this.totalActiveClients / this.totalClients * 100)
  }

}
