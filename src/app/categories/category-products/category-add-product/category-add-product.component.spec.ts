import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddProductComponent } from './category-add-product.component';

describe('CategoryAddProductComponent', () => {
  let component: CategoryAddProductComponent;
  let fixture: ComponentFixture<CategoryAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
