import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAddComponent } from './ingredient-add.component';

describe('IngredientAddComponent', () => {
  let component: IngredientAddComponent;
  let fixture: ComponentFixture<IngredientAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
