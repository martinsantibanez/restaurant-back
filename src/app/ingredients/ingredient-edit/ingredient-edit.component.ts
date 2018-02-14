import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../../core/ingredient.model';
import { IngredientService } from '../../core/ingredient.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit {
  @Input() ingredient: Ingredient;
  constructor(public activeModal: NgbActiveModal, private ingredientService: IngredientService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.ingredientService.updateIngredient(this.ingredient).subscribe(
      () => this.activeModal.close("Updated")
      );
  }

}
