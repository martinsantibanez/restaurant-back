import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product, RecipeItem } from '../../core/product.model';
import { ProductService } from '../../core/product.service';
import { Ingredient } from '../../core/ingredient.model';
import { IngredientService } from '../../core/ingredient.service';
import { RecipeAddIngredientComponent } from './recipe-add-ingredient/recipe-add-ingredient.component';

@Component({
  selector: 'app-product-recipe',
  templateUrl: './product-recipe.component.html',
  styleUrls: ['./product-recipe.component.css']
})
export class ProductRecipeComponent implements OnInit {
  @Input() product: Product;
  recipe: RecipeItem[];

  constructor(private productService: ProductService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
         .subscribe(product => this.product = product);
  }

  addIngredient(){
    const modalRef = this.modalService.open(RecipeAddIngredientComponent);
    modalRef.componentInstance.product = this.product;
    modalRef.result.then(data => {
      this.getProduct();
    }, data => {});
  }

}
