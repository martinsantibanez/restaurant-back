import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../core/category.model';
import { Product } from '../../../core/product.model';
import { CategoryService } from '../../../core/category.service';
import { ProductService } from '../../../core/product.service';
import { ProductAddComponent } from '../../../products/product-add/product-add.component';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-category-add-product',
  templateUrl: './category-add-product.component.html',
  styleUrls: ['./category-add-product.component.css']
})
export class CategoryAddProductComponent implements OnInit {
  @Input() categoryId: string;
  selectedProduct: Product;
  products: Product[];
  //Typeahead
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.products.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  
  formatter = (x) => x.name;
  //

  constructor(
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      data => this.products = data
    );
  }

  add(){
    this.activeModal.close(this.selectedProduct);
  }

}
