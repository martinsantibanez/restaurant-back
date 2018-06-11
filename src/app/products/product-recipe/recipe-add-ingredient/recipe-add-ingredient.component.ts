import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


import { Product } from '../../../core/product.model';
import { RecipeItem } from '../../../core/product.model';
import { ProductService } from '../../../core/product.service';

import { Ingredient } from '../../../core/ingredient.model';
import { IngredientService } from '../../../core/ingredient.service'; 
@Component({
  selector: 'app-recipe-add-ingredient',
  templateUrl: './recipe-add-ingredient.component.html',
  styleUrls: ['./recipe-add-ingredient.component.css']
})
export class RecipeAddIngredientComponent implements OnInit {
  @Input() product: Product;
  ingredients: Ingredient[];
  recipeItem: RecipeItem;

  constructor(public activeModal: NgbActiveModal, private ingredientService: IngredientService, private productService: ProductService) {
    this.recipeItem = new RecipeItem();
  }
  //Typeahead
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  search = (text$: Observable<string>) =>
   text$
     .debounceTime(200)
     .map(term => term === '' ? []
       : this.ingredients.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
 
 formatter = (x) => x.name;
 //

  ngOnInit() {
    this.ingredientService.getIngredients().subscribe(
      ingredients => this.ingredients = ingredients
      );
  }

  add(){
    this.productService.addIngredientToRecipe(this.product, this.recipeItem).subscribe(
      () => { this.activeModal.close("Updated"); }
     );
  }


}
