import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../../core/product.model';
import { ProductService } from '../../core/product.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product;
  constructor(private productService: ProductService, public activeModal: NgbActiveModal,) { }

  ngOnInit() {
    this.product = new Product();
    this.product.recipe = [];
  }

  save(){
    this.productService.addProduct(this.product).subscribe(
      () => { this.activeModal.close(this.product) }
    );
  }
}
