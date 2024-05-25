import { Component, OnInit } from '@angular/core';
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
  IonChip,
  IonIcon,
  IonSpinner,
} from '@ionic/angular/standalone';

import { closeCircle } from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { ChangasService } from 'src/app/core/services/changas/changas.service';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { ChangaOverviewCardComponent } from 'src/app/shared/components/changa-overview-card/changa-overview-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';

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
    IonChip,
    IonIcon,
    IonSpinner,
  ],
})
export class SearchResultsPage implements OnInit {
  searchTerm: string = '';
  topics: string[] = [];
  changas: ChangaOverview[] = [];
  loaded = false;

  constructor(
    private changasService: ChangasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ closeCircle });
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          this.searchTerm = params['searchTerm'];
          this.topics =
            typeof params['topics'] === 'string'
              ? [params['topics']]
              : params['topics'] || [];
          return this.handleSearch(this.searchTerm, this.topics);
        })
      )
      .subscribe({
        next: (changas: ChangaOverview[]) => {
          this.changas = changas;
          this.loaded = true;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  canSearch() {
    return this.canSearchByTitle() || this.canSearchByTopic();
  }

  canSearchByTopic() {
    return this.topics.length > 0;
  }

  canSearchByTitle() {
    return this.searchTerm && this.searchTerm.trim() !== '';
  }

  handleSearch(searchTerm: string, topics: any): Observable<ChangaOverview[]> {
    // Search by title and topics
    if (searchTerm && topics.length) {
      return this.changasService
        .searchChangasByTitleAndTopics(searchTerm, topics)
        .pipe(switchMap(this.handleSearchResponse));
    }

    // Search by topics
    if (topics.length) {
      return this.changasService
        .searchChangasByTopic(topics)
        .pipe(switchMap(this.handleSearchResponse));
    }

    // Search by title
    return this.changasService
      .searchChangasByTitle(searchTerm)
      .pipe(switchMap(this.handleSearchResponse));
  }

  handleSearchResponse(response: ApiResponse<ChangaOverview[]>) {
    if (response.success) {
      return new Observable<ChangaOverview[]>((subscriber) => {
        subscriber.next(response.data);
        subscriber.complete();
      });
    } else {
      return new Observable<ChangaOverview[]>((subscriber) => {
        subscriber.error(response.error);
      });
    }
  }

  handleSearchInput(event: any) {
    this.searchTerm = event.target.value;
    if (this.canSearch()) {
      this.loaded = false;
      this.router.navigate(['/search-results'], {
        queryParams: { searchTerm: this.searchTerm, topics: this.topics },
      });
    }
  }

  removeTopic(topic: string) {
    this.router.navigate(['/search-results'], {
      queryParams: {
        searchTerm: this.searchTerm,
        topics: this.topics.filter((t) => t !== topic),
      },
    });
  }
}
