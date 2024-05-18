import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditChangaPage } from './edit-changa.page';

describe('EditChangaPage', () => {
  let component: EditChangaPage;
  let fixture: ComponentFixture<EditChangaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChangaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
