import { Component, Input, OnInit } from '@angular/core';
import { IonBadge } from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.scss'],
  standalone: true,
  imports: [IonBadge],
})
export class TransactionStatusComponent implements OnInit {
  @Input() status: string = '';

  parsedStatus: string = '';
  statusColor: string = '';

  constructor() {}

  ngOnInit() {
    switch (this.status) {
      case 'AWAITING_PROVIDER_CONFIRMATION':
        this.parsedStatus = 'Esperando confirmación del proveedor';
        this.statusColor = 'warning';
        break;
      case 'AWAITING_REQUESTER_CONFIRMATION':
        this.parsedStatus = 'Esperando confirmacion de solicitante';
        this.statusColor = 'warning';
        break;
      case 'ACCEPTED_BY_REQUESTER':
        this.parsedStatus = 'Aceptado por el solicitante';
        this.statusColor = 'success';
        break;
      case 'DECLINED_BY_REQUESTER':
        this.parsedStatus = 'Rechazado por el solicitante';
        this.statusColor = 'danger';
        break;
      default:
        this.parsedStatus = 'Desconocido';
        break;
    }
  }
}
