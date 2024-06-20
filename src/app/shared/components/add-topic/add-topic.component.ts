import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IonInput, IonChip, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonInput, IonChip, IonLabel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddTopicComponent,
    },
  ],
})
export class AddTopicComponent implements ControlValueAccessor {
  onChange: OnChangeFn<string[]> = () => {};
  onTouch: OnTouchedFn = () => {};

  topics: string[] = [];
  newTopic: string = '';
  disabled = false;

  constructor() {}

  addTopic(event: any) {
    event.preventDefault();
    console.log('Adding topic:', this.newTopic);
    this.topics.push(this.newTopic);
    this.newTopic = '';
    this.onChange(this.topics);
  }

  removeTopic(index: number) {
    console.log('Removing topic:', this.topics[index]);
    this.topics.splice(index, 1);
  }

  writeValue(topics: string[]): void {
    if (!topics) return;
    this.topics = topics;
  }
  registerOnChange(fn: OnChangeFn<string[]>): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

type OnChangeFn<T> = (value: T) => void;
type OnTouchedFn = () => void;
