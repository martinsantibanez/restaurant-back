import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../core/category.model';
import { CategoryService } from '../../core/category.service';

@Component({
  selector: 'category-remove',
  templateUrl: './category-remove.component.html',
  styleUrls: ['./category-remove.component.css']
})
export class CategoryRemoveComponent implements OnInit {
  @Input() category: Category;
  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService) { }

  ngOnInit() {
  }

  delete(){
    this.categoryService.deleteCategory(this.category).subscribe(
      () => {
        this.activeModal.close('Deleted');
      });
  }

}
