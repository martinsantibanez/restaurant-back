import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddComponent } from './categories/add/add.component';
import { MessagesComponent } from './messages/messages.component';


//Services
import { CategoryService } from './category.service';
import { MessageService } from './message.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { EditComponent } from './categories/edit/edit.component';
import { RemoveComponent } from './categories/remove/remove.component';



@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    CategoriesComponent,
    AddComponent,
    EditComponent,
    RemoveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    DataTablesModule
  ],
  providers: [CategoryService, MessageService],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent, EditComponent, RemoveComponent]
})
export class AppModule { }
