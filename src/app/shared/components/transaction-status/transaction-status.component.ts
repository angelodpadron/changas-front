import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonBadge } from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.scss'],
  standalone: true,
  imports: [IonBadge],
})
export class TransactionStatusComponent implements OnInit, OnChanges {
  @Input() status: string = '';

  parsedStatus: string = '';
  statusColor: string = '';

  constructor() {}

  ngOnInit() {
    this.updateStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['status']) {
      this.updateStatus();
    }
  }

  private updateStatus() {
    switch (this.status) {
      case 'AWAITING_PROVIDER_CONFIRMATION':
        this.parsedStatus = 'Esperando respuesta del proveedor';
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
      case 'DECLINED_BY_PROVIDER':
        this.parsedStatus = 'Rechazado por el proveedor';
        this.statusColor = 'danger';
        break;
      default:
        this.parsedStatus = 'Desconocido';
        break;
    }
  }
}
