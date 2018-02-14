import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  faIcon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '', title: 'Dashboard',  faIcon: 'fa-dashboard', class: '' },
    { path: 'categories', title: 'Categorias',  faIcon:'fa-list', class: '' },
    { path: 'products', title: 'Productos', faIcon: 'fa-product-hunt', class: ''},
    { path: 'ingredients', title: 'Ingredientes', faIcon: 'fa-info', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  };
}