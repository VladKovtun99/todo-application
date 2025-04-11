import { TestBed } from '@angular/core/testing';

import { AuthTemporaryService } from './auth-temporary.service';

describe('AuthTemporaryService', () => {
  let service: AuthTemporaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTemporaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
