import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';

import { IngredientService } from '../core/ingredient.service';
import { Ingredient } from '../core/ingredient.model';

import { IngredientAddComponent } from './ingredient-add/ingredient-add.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IngredientRemoveComponent } from './ingredient-remove/ingredient-remove.component'

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  ingredients: Ingredient[];
  constructor(private ingredientService: IngredientService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getIngredients();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      language: { "url": "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }
    };
  }
  getIngredients(){
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
      this.renderTable();
    });
  }

  add(){
    const modalRef = this.modalService.open(IngredientAddComponent);
    modalRef.result.then(data => {
      this.getIngredients();
    });
  }
  edit(ingredient: Ingredient){
    const modalRef = this.modalService.open(IngredientEditComponent);
    modalRef.componentInstance.ingredient = ingredient;
    modalRef.result.then(data => {
      this.getIngredients();
    });
  }
  remove(ingredient: Ingredient){
    const modalRef = this.modalService.open(IngredientRemoveComponent);
    modalRef.componentInstance.ingredient = ingredient;
    modalRef.result.then(data => {
      this.getIngredients();
    });
  }

  renderTable(): void {
    if(this.dtElement.dtInstance){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } else { 
      this.dtTrigger.next();
    }
  }

}
