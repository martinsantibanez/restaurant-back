import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';

import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ApiConfig } from './api.config';

import { Ingredient } from './ingredient.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IngredientService {
  private endPoint = ApiConfig.API_ENDPOINT + 'ingredients/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /*
    GET: /ingredients
  */
  getIngredients(): Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(this.endPoint)
        .pipe(
          tap (ingredients => this.log('fetched ingredients')),
          catchError(this.handleError('getIngredients', []))
          );
  }

  getIngredient(id: string): Observable<Ingredient>{
    return this.http.get<Ingredient>(this.endPoint+id)
      .pipe(
        tap(ingredient => this.log('fetched ingredient')),
        catchError(this.handleError<Ingredient>('getIngredient'))
        );
  }
  /*
    POST: /ingredients
  */
  addIngredient(ingredient: Ingredient): Observable<Ingredient>{
    return this.http.post<Ingredient>(this.endPoint, ingredient, httpOptions)
    .pipe(
      tap( (ingredient: Ingredient) => this.log('added ingr id = ${ingredient._id}') ),
      catchError(this.handleError<Ingredient>('addIngredient'))
      );
  }

  /*
    DELETE: /ingredients/:id
  */
  deleteIngredient(ingredient: Ingredient): Observable<Ingredient>{
    return this.http.delete<Ingredient>(this.endPoint + ingredient._id, httpOptions)
    .pipe(
      tap(_ => this.log('deleted ingredient')),
      catchError(this.handleError<Ingredient>('deleteIngredient'))
      );
  }
  /*
    PUT: /ingredients/:id
  */
  updateIngredient(ingredient: Ingredient): Observable<any> {
    return this.http.put(this.endPoint + ingredient._id, ingredient, httpOptions).pipe(
      tap(_ => this.log('updated ingr id=${ingredient._id}')),
      catchError(this.handleError<any>('updateIngredient'))
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
