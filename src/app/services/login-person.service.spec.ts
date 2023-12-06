import { TestBed } from '@angular/core/testing';

import { LoginPersonService } from './login-person.service';

describe('LoginPersonService', () => {
  let service: LoginPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
