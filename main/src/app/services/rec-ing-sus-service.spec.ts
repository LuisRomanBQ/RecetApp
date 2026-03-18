import { TestBed } from '@angular/core/testing';

import { RecIngSusService } from './rec-ing-sus-service';

describe('RecIngSusService', () => {
  let service: RecIngSusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecIngSusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
