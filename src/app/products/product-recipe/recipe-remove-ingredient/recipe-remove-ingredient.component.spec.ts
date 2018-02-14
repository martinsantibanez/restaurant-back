import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRemoveIngredientComponent } from './recipe-remove-ingredient.component';

describe('RecipeRemoveIngredientComponent', () => {
  let component: RecipeRemoveIngredientComponent;
  let fixture: ComponentFixture<RecipeRemoveIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeRemoveIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeRemoveIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
