import { TestBed } from '@angular/core/testing';

import { RecIngService } from './rec-ing-service';

describe('RecIngService', () => {
  let service: RecIngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecIngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
