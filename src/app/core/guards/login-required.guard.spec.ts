import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginRequiredGuard } from './login-required.guard';

describe('loginRequiredGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginRequiredGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
