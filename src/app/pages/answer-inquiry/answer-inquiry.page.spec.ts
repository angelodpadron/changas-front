import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerInquiryPage } from './answer-inquiry.page';

describe('AnswerInquiryPage', () => {
  let component: AnswerInquiryPage;
  let fixture: ComponentFixture<AnswerInquiryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerInquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
