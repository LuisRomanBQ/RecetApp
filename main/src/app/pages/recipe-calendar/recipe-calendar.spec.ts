import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCalendar } from './recipe-calendar';

describe('RecipeCalendar', () => {
  let component: RecipeCalendar;
  let fixture: ComponentFixture<RecipeCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
