import { TestBed } from '@angular/core/testing';

import { PasoService } from './paso-service';

describe('PasoService', () => {
  let service: PasoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
