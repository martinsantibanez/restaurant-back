import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CategoryService } from '../core/category.service';
import { Category } from '../core/category.model';
import { Subject } from 'rxjs/Subject';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';


import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryRemoveComponent } from './category-remove/category-remove.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  categories: Category[];

  constructor(private categoryService: CategoryService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategories();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      language: { "url": "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }
    };
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        this.renderTable();
      }
    );
    console.log(this.categories);
  }

  edit(category: Category){
    const modalRef = this.modalService.open(CategoryEditComponent);
    modalRef.componentInstance.category = category;
    modalRef.result.then((data) => {
      this.getCategories();
    }, (reason) => {});
  }

  remove(category: Category){
    const modalRef = this.modalService.open(CategoryRemoveComponent);
    modalRef.componentInstance.category = category;
    modalRef.result.then((data) => {
      this.getCategories();
    }, (reason) => {})
  }

  add(){
    const modalRef = this.modalService.open(CategoryAddComponent);
    modalRef.result.then((data) => {
      //on close
      this.categories.push(data);
      this.getCategories();
    }, (reason) => {
      //on dismiss
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


