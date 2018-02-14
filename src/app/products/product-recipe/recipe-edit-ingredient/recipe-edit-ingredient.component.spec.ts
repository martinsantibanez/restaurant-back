import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditIngredientComponent } from './recipe-edit-ingredient.component';

describe('RecipeEditIngredientComponent', () => {
  let component: RecipeEditIngredientComponent;
  let fixture: ComponentFixture<RecipeEditIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
