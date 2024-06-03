import { TestBed } from '@angular/core/testing';

import { InquiryService } from './question.service';

describe('QuestionService', () => {
  let service: InquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
