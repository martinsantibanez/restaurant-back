import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../core/product.service';
import { Product } from '../../core/product.model';


@Component({
  selector: 'app-product-remove',
  templateUrl: './product-remove.component.html',
  styleUrls: ['./product-remove.component.css']
})
export class ProductRemoveComponent implements OnInit {
  @Input() product: Product;
  constructor(private productService: ProductService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  delete(){
    this.productService.deleteProduct(this.product).subscribe(() => {
      this.activeModal.close("Deleted");
    });
  }
}
