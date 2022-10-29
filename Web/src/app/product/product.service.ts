import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Product} from "../model/product";
import {environment} from "../../environments/environment";
import {Category} from "../model/category";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {MessageService} from "../message.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productUrl: string = '';

  constructor(private http: HttpClient, private messageService : MessageService) {
    this.productUrl = environment.productUrl;
  }

  findAll(){
    console.log(`${this.productUrl}/products`)
    return this.http.get<Product[]>(`${this.productUrl}/products`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  save(product : any ) : Observable<Product> {
      return this.http.post<Product>(`${this.productUrl}/products`, product)
        .pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );
  }

  getProductImage(productId : number){
    return this.http.get<any>(`${this.productUrl}/products/{productId}/image`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  findAllCategory(){
    console.log(`${this.productUrl}/categories`)
    return this.http.get<Category[]>(`${this.productUrl}/categories`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getProductImageUrl(productId: number) {
    return `${this.productUrl}/products/{productId}/image`;
  }

  update(product: Product) {
    return this.http.put<Product>(`${this.productUrl}/products/${product.id}`, product)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  delete(product: Product) {
    return this.http.delete<Product>(`${this.productUrl}/products/${product.id}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  search(query: string, queryCategory:string) {
    const options = { params: new HttpParams().set('query', query).set("query_category", queryCategory) };
    return this.http.get<Product[]>(`${this.productUrl}/products/search`, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  deleteAll(query: string) {
    const options = { params: new HttpParams().set('query', query) };
    return this.http.delete<Product[]>(`${this.productUrl}/products/delete/all`, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // this.messageService.add(`[ERROR] An error occurred in ProductService: ${error.error}`)
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // this.messageService.add(`[ERROR] Backend returned code ${error.status}, body was: ${error.error}`)
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
