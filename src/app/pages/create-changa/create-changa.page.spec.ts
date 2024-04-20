import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateChangaPage } from './create-changa.page';

describe('CreateChangaPage', () => {
  let component: CreateChangaPage;
  let fixture: ComponentFixture<CreateChangaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChangaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
