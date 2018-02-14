import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';

import { ProductService } from '../core/product.service';
import { Product } from '../core/product.model';

import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductRemoveComponent } from './product-remove/product-remove.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  products: Product[];

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProducts();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      language: { "url": "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }
    };
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.renderTable();
    });
  }

  add(){
    const modalRef = this.modalService.open(ProductAddComponent);
    modalRef.result.then(data => {
      this.getProducts();
    }, r => {});
  }
  edit(product: Product){
    const modalRef = this.modalService.open(ProductEditComponent);
    modalRef.componentInstance.product = product;
    modalRef.result.then(data => {
      this.getProducts();
    }, r => {});
  }
  remove(product: Product){
    const modalRef = this.modalService.open(ProductRemoveComponent);
    modalRef.componentInstance.product = product;
    modalRef.result.then(data => {
      this.getProducts();
    }, r => {});
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
