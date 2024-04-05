import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangaDetailsPage } from './changa-details.page';

describe('ChangaDetailsPage', () => {
  let component: ChangaDetailsPage;
  let fixture: ComponentFixture<ChangaDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangaDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
