import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'

import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

import { Category } from './category.model';

import { ApiConfig } from './api.config'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {
    private endPoint = ApiConfig.API_ENDPOINT + 'categories/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /*
    GET: /categories, /categories/:id
  */
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.endPoint)
        .pipe(
          tap (categories => this.log('fetched categories')),
          catchError(this.handleError('getCategories', []))
          );
  }

  getCategory(id): Observable<Category>{
    const url = `${this.endPoint}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`category id=${id}`))
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
  deleteCategory(category: Category | string): Observable<Category>{
    const id = typeof category === 'string' ? category : category._id;
    const url = '${this.endPoint}/${id}';
    return this.http.delete<Category>(url, httpOptions)
    .pipe(
      tap(_ => this.log('deleted cat id=${id}')),
      catchError(this.handleError<Category>('deleteCategory'))
      );
  }
  /*
    PUT: /categories
  */
  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.endPoint, category, httpOptions).pipe(
      tap(_ => this.log('updated cat id=${category.id}')),
      catchError(this.handleError<any>('updateCategory'))
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
