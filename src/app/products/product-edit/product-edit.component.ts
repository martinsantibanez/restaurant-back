import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from '../../core/product.model';
import { ProductService } from '../../core/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @Input() product: Product;
  constructor(private productService: ProductService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit(){
    this.productService.updateProduct(this.product).subscribe(
      () => this.activeModal.close("Updated")
    );
  }

}
