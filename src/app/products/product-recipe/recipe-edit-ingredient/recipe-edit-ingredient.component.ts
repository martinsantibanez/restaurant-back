import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product, RecipeItem } from '../../../core/product.model';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'app-recipe-edit-ingredient',
  templateUrl: './recipe-edit-ingredient.component.html',
  styleUrls: ['./recipe-edit-ingredient.component.css']
})
export class RecipeEditIngredientComponent implements OnInit {
  @Input() product: Product;
  @Input() recipeItem: RecipeItem;
  constructor(private productService: ProductService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmit(){
    this.productService.editRecipe(this.product, this.recipeItem).subscribe(
      () => this.activeModal.close("Updated")
    );
  }
  

}
