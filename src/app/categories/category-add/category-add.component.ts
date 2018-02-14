import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Category } from '../../core/category.model';
import { CategoryService } from '../../core/category.service';

@Component({
  selector: 'category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  category: Category;
  constructor(
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService
  ) { }
  ngOnInit() {
    this.category = new Category();
    this.category.products = [];
    this.category.show = true;
  }

  save(){
    this.categoryService.addCategory(this.category).subscribe(
      () => this.activeModal.close(this.category)
    );
  }

}
