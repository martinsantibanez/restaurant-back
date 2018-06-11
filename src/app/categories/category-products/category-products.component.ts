import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product, RecipeItem } from '../../core/product.model';
import { ProductService } from '../../core/product.service';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

import { Category } from '../../core/category.model';
import { CategoryService } from '../../core/category.service';
import { CategoryAddProductComponent } from './category-add-product/category-add-product.component';
import { CategoryRemoveProductComponent } from './category-remove-product/category-remove-product.component';
import { ProductEditComponent } from '../../products/product-edit/product-edit.component';
@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  @Input() category: Category;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(){
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id)
         .subscribe(category => this.category = category);
  }

  editCategory(){
    const modalRef = this.modalService.open(CategoryEditComponent);
    modalRef.componentInstance.category = this.category;
    modalRef.result.then(data => {
      this.getCategory();
    }, data => {});
  }
  
  addProduct(){
    const modalRef = this.modalService.open(CategoryAddProductComponent);
    modalRef.componentInstance.category = this.category;
    modalRef.result.then(data => {
      this.category.products.push(data);
      this.categoryService.addProductToCategory(this.category, data).subscribe(
        () => this.getCategory()
      );
    }, data => {});
  }

  removeProduct(prod: Product){
    const modalRef = this.modalService.open(CategoryRemoveProductComponent);
    modalRef.componentInstance.category = this.category;
    modalRef.componentInstance.product = prod;
    modalRef.result.then(data => this.getCategory(), data => {})
  }

  editProduct(prod: Product){
    const modalRef = this.modalService.open(ProductEditComponent);
    modalRef.componentInstance.product = prod;
    modalRef.result.then(data => this.getCategory(), data => {})
    
  }
}
