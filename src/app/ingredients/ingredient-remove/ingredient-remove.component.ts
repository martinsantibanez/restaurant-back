import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from '../../core/ingredient.model';
import { IngredientService } from '../../core/ingredient.service';

@Component({
  selector: 'app-ingredient-remove',
  templateUrl: './ingredient-remove.component.html',
  styleUrls: ['./ingredient-remove.component.css']
})
export class IngredientRemoveComponent implements OnInit {
  @Input() ingredient: Ingredient;
  constructor(public activeModal: NgbActiveModal, private ingredientService: IngredientService) { }

  ngOnInit() {
  }

  delete(){
    this.ingredientService.deleteIngredient(this.ingredient).subscribe(
      () => this.activeModal.close("Deleted")
    );
  }

}
