import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Ingredient } from '../../core/ingredient.model';
import { IngredientService } from '../../core/ingredient.service';
@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['./ingredient-add.component.css']
})
export class IngredientAddComponent implements OnInit {
  ingredient: Ingredient

  constructor(public activeModal: NgbActiveModal, private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredient = new Ingredient();
    this.ingredient.stock = 0;
  }

  save(){
    this.ingredientService.addIngredient(this.ingredient).subscribe(
      () => this.activeModal.close(this.ingredient)
    );
  }

}
