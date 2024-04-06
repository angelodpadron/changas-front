import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HiringsPage } from './hirings.page';

describe('HiringsPage', () => {
  let component: HiringsPage;
  let fixture: ComponentFixture<HiringsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
