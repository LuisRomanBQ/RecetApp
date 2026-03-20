import { TestBed } from '@angular/core/testing';

import { RecipeDataAgg } from './recipe-data-agg';

describe('RecipeDataAgg', () => {
  let service: RecipeDataAgg;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeDataAgg);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
