import { TestBed } from '@angular/core/testing';

import { ChangasAPIService } from './changas-api.service';

describe('ChangasAPIService', () => {
  let service: ChangasAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangasAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
