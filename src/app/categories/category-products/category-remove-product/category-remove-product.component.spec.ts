import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRemoveProductComponent } from './category-remove-product.component';

describe('CategoryRemoveProductComponent', () => {
  let component: CategoryRemoveProductComponent;
  let fixture: ComponentFixture<CategoryRemoveProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryRemoveProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRemoveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
