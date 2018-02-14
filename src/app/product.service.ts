import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ApiConfig } from './api.config';

import { Product } from './product.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {
  private endPoint = ApiConfig.API_ENDPOINT + 'products/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /*
    GET: /products
  */
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.endPoint)
        .pipe(
          tap (products => this.log('fetched products')),
          catchError(this.handleError('getProducts', []))
          );
  }

  /*
    POST: /products
  */
  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.endPoint, product, httpOptions)
    .pipe(
      tap( (product: Product) => this.log('added prod id = ${product._id}') ),
      catchError(this.handleError<Product>('addProduct'))
      );
  }

  /*
    DELETE: /products/:id
  */
  deleteProduct(product: Product): Observable<Product>{
    return this.http.delete<Product>(this.endPoint + product._id, httpOptions)
    .pipe(
      tap(_ => this.log('deleted prod')),
      catchError(this.handleError<Product>('deleteProduct'))
      );
  }
  /*
    PUT: /products/:id
  */
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.endPoint + product._id, product, httpOptions).pipe(
      tap(_ => this.log('updated prod id=${product._id}')),
      catchError(this.handleError<any>('updateProduct'))
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
