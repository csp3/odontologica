import { TestBed } from '@angular/core/testing';

import { ServpostlogeoService } from './servpostlogeo.service';

describe('ServpostlogeoService', () => {
  let service: ServpostlogeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServpostlogeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
