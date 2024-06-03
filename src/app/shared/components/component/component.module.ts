import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from '../question/question.component';
import {IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonLabel, IonCard, IonCardContent,
   IonList, IonThumbnail,IonItemDivider, IonItemGroup, IonCardHeader,IonCardSubtitle,IonCardTitle} from '@ionic/angular/standalone'
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonLabel,IonCard,IonCardContent,IonList, IonThumbnail, IonItemDivider,
    IonItemGroup,IonCardHeader,IonCardSubtitle,IonCardTitle,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[QuestionComponent]
})
export class ComponentModule { }
