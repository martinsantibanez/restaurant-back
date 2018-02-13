import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Subject } from 'rxjs/Subject';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';


import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { RemoveComponent } from './remove/remove.component';

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
        this.dtTrigger.next();
      }
    );
    console.log(this.categories);
  }

  edit(category: Category){
    const modalRef = this.modalService.open(EditComponent);
    modalRef.componentInstance.category = category;
  }

  remove(category: Category){
    const modalRef = this.modalService.open(RemoveComponent);

  }

  add(){
    const modalRef = this.modalService.open(AddComponent);
    modalRef.result.then((data) => {
      //on close
      this.categories.push(data);
      this.getCategories();
      console.log(data);
    }, (reason) => {
      //on dismiss
    });
  }

  addRow(data: Category): void {
    this.dtElement.dtInstance.then( (dtInstance: DataTables.Api) => {
      dtInstance.row.add(data);
    });
  }
}

