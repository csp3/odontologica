import { TestBed } from '@angular/core/testing';

import { ServiciojuntarService } from './serviciojuntar.service';

describe('ServiciojuntarService', () => {
  let service: ServiciojuntarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciojuntarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
