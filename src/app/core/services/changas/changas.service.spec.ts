import { TestBed } from '@angular/core/testing';

import { ChangasService } from './changas.service';

describe('ChangasService', () => {
  let service: ChangasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
