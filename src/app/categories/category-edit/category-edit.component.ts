import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../core/category.model';
import { CategoryService } from '../../core/category.service';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @Input() category: Category;
  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.categoryService.updateCategory(this.category).subscribe(
      () => this.activeModal.close('Updated '+this.category.name)
    );
  }

}
