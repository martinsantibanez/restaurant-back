import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'

import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

import { Category } from './category.model';
import { Product } from './product.model';

import { ApiConfig } from './api.config'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {
  private endPoint = ApiConfig.API_ENDPOINT + 'categories/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /*
    GET: /categories
  */
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.endPoint)
        .pipe(
          tap (categories => this.log('fetched categories')),
          catchError(this.handleError('getCategories', []))
          );
  }

  getCategory(id: string): Observable<Category>{
    return this.http.get<Category>(this.endPoint + id, httpOptions)
    .pipe(
      tap( (c: Category) => this.log('G'))
    );
  }
  /*
    POST: /categories
  */
  addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.endPoint, category, httpOptions)
    .pipe(
      tap( (category: Category) => this.log('added cat id = ${category.id}') ),
      catchError(this.handleError<Category>('addCategory'))
      );
  }

  /*
    DELETE: /categories/:id
  */
  deleteCategory(category: Category): Observable<Category>{
    return this.http.delete<Category>(this.endPoint + category._id, httpOptions)
    .pipe(
      tap(_ => this.log('deleted cat id=${id}')),
      catchError(this.handleError<Category>('deleteCategory'))
      );
  }
  /*
    PUT: /categories/:id
  */
  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.endPoint + category._id, category, httpOptions).pipe(
      tap(_ => this.log('updated cat id=${category.id}')),
      catchError(this.handleError<any>('updateCategory'))
      );
  }

  /*
    GET: /categories/:id/products
  */
  getProductsFromCategory(id: string): Observable <Product[]> {
    return this.http.get<Product[]>(this.endPoint + id + '/products', httpOptions).pipe(
      tap (products => this.log('fetched products from '+id)),
      catchError(this.handleError('getProductsFromCategory', []))
    );
  }
  /**
    add product to category's products.
    POST: /categories/:id/products
    body: {id: product_id}
  */
  addProductToCategory(category: Category, product: Product): Observable<any> {
    return this.http.post(this.endPoint + category._id + '/products', {'id' : product._id}, httpOptions)
    .pipe(
      tap(_ => this.log('added product to cat')),
      catchError(this.handleError('addProductToCategory', []))
    );
  }
  /*
    remove product from category's products.
    DELETE: /categories/:id/products/:product_id
  */
  removeProductFromCategory(category: Category, product: Product): Observable<any> {
    return this.http.delete(this.endPoint + category._id + '/products/' + product._id, httpOptions)
    .pipe(
      tap(_ => this.log('removed product from cat')),
      catchError(this.handleError('removeProductFromCategory', []))
    );
  }
  
  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
   
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
   
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
   
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
   
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add('HeroService: ' + message);
    }
}
