import { TestBed } from '@angular/core/testing';

import { RecEtiService } from './rec-eti-service';

describe('RecEtiService', () => {
  let service: RecEtiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecEtiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
