import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs/Subject';

import { Category } from '../../category.model';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  category: Category;
  constructor(
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService
  ) { }
  ngOnInit() {
    this.category = new Category();
    this.category.products = [];
  }

  save(){
    this.categoryService.addCategory(this.category).subscribe(
      () => {
        this.activeModal.close(this.category);
      }
      );
  }

}
