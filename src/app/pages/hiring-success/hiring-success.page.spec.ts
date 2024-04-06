import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HiringSuccessPage } from './hiring-success.page';

describe('HiringSuccessPage', () => {
  let component: HiringSuccessPage;
  let fixture: ComponentFixture<HiringSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
