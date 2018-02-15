import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../core/product.service';
import { Product } from '../../../core/product.model';
import { RecipeItem } from '../../../core/product.model';

@Component({
  selector: 'app-recipe-remove-ingredient',
  templateUrl: './recipe-remove-ingredient.component.html',
  styleUrls: ['./recipe-remove-ingredient.component.css']
})
export class RecipeRemoveIngredientComponent implements OnInit {
  @Input() product: Product;
  @Input() item: RecipeItem;
  constructor(public activeModal: NgbActiveModal, private productService: ProductService) { }

  ngOnInit() {

  }
  delete(){
    this.product.recipe = this.product.recipe.filter(i => i !== this.item);
    this.productService.updateProduct(this.product).subscribe(
      () => this.activeModal.close("Updated")
      )
  }

}
