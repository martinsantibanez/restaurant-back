import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product, RecipeItem } from '../../core/product.model';
import { ProductService } from '../../core/product.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';

import { Ingredient } from '../../core/ingredient.model';
import { IngredientService } from '../../core/ingredient.service';
import { RecipeAddIngredientComponent } from './recipe-add-ingredient/recipe-add-ingredient.component';
import { RecipeEditIngredientComponent } from './recipe-edit-ingredient/recipe-edit-ingredient.component';
import { RecipeRemoveIngredientComponent } from './recipe-remove-ingredient/recipe-remove-ingredient.component';


@Component({
  selector: 'app-product-recipe',
  templateUrl: './product-recipe.component.html',
  styleUrls: ['./product-recipe.component.css']
})
export class ProductRecipeComponent implements OnInit {
  @Input() product: Product;

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

  editIngredient(item: RecipeItem){
    const modalRef = this.modalService.open(RecipeEditIngredientComponent);
    modalRef.componentInstance.product = this.product;
    modalRef.componentInstance.recipeItem = item;
    modalRef.result.then(data => {
      this.getProduct();
    }, data => {});

  }

  removeIngredient(item: RecipeItem){
    const modalRef = this.modalService.open(RecipeRemoveIngredientComponent);
    modalRef.componentInstance.product = this.product;
    modalRef.componentInstance.item = item;
    modalRef.result.then(data => {
      this.getProduct();
    }, data => {});

  }
  
  editRecipe(){
    const modalRef = this.modalService.open(ProductEditComponent);
    modalRef.componentInstance.product = this.product;
    modalRef.result.then(data => {
      this.getProduct();
    }, data => {});
  }

}
