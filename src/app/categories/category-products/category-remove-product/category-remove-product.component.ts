import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../core/category.model';
import { CategoryService } from '../../../core/category.service';
import { Product } from '../../../core/product.model';

@Component({
  selector: 'app-category-remove-product',
  templateUrl: './category-remove-product.component.html',
  styleUrls: ['./category-remove-product.component.css']
})
export class CategoryRemoveProductComponent implements OnInit {
  @Input() category: Category
  @Input() product: Product;
  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService) { }

  ngOnInit() {
  }

  delete(){
    this.category.products = this.category.products.filter(i => i !== this.product);
    this.categoryService.updateCategory(this.category)
    .subscribe( () => this.activeModal.close("Deleted"));
  }

}
