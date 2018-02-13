import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Category } from '../../category.model';
import { CategoryService } from '../../category.service';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() category: Category;
  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService, private location: Location) { }

  ngOnInit() {
  }

  onSubmit(){
    this.categoryService.updateCategory(this.category).subscribe(() => this.activeModal.close('Updated'));
  }

}
