import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonProgressBar,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { ChangasService } from 'src/app/core/services/changas.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { ChangaOverview } from 'src/app/core/models/changa-overview';
import { ChangaOverviewCardComponent } from 'src/app/shared/components/changa-overview-card/changa-overview-card.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
  standalone: true,
  imports: [
    ChangaOverviewCardComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonProgressBar,
    IonSearchbar,
  ],
})
export class SearchResultsPage implements OnInit {
  @Input('searchTerm') searchTerm: string = '';
  changas: ChangaOverview[] = [];

  constructor(private changasService: ChangasService) {}

  ngOnInit() {
    if (this.searchTerm.startsWith('topic:')) {
      const topic = this.searchTerm.split(':')[1];
      this.searchChangasByTopic(topic);
    }
  }

  private searchChangasByTopic(topic: string) {
    this.changasService.searchChangasByTopic(topic).subscribe({
      next: (response: ApiResponse<ChangaOverview[]>) => {
        if (response.success) {
          this.changas = response.data;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
