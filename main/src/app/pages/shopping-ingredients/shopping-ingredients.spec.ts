import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingIngredients } from './shopping-ingredients';

describe('ShoppingIngredients', () => {
  let component: ShoppingIngredients;
  let fixture: ComponentFixture<ShoppingIngredients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingIngredients],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingIngredients);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
