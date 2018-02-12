import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { Subject } from 'rxjs/Subject';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private categoryService: CategoryService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategories();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      language: { "url": "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }
    };
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories
        this.dtTrigger.next();
      }
    );
    console.log(this.categories);
  }

  numProds(category: Category){
    return category.products.length;
  }

  edit(category: Category){
    const modalRef = this.modalService.open(AddComponent);

  }

  remove(category: Category){

  }
}

