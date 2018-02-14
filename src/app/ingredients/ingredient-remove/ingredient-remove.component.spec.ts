import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientRemoveComponent } from './ingredient-remove.component';

describe('IngredientRemoveComponent', () => {
  let component: IngredientRemoveComponent;
  let fixture: ComponentFixture<IngredientRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
