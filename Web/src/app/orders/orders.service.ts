import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../model/category";
import {map, Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {MessageService} from "../message.service";
import {Order} from "../model/order";
import {FormArray} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly orderUrl: string = '';

  constructor(private http: HttpClient, private messageService : MessageService) {
    this.orderUrl = environment.orderUrl;
  }

  findAll(){
    console.log(`${this.orderUrl}/orders`)
    return this.http.get<Order[]>(`${this.orderUrl}/orders`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  save(order : any ) : Observable<Order> {
    return this.http.post<Order>(`${this.orderUrl}/orders`, order)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getOrderImageUrl(orderId: number) {
    return `${this.orderUrl}/orders/{orderId}/image`;
  }

  update(order: Order) {
    return this.http.put<Order>(`${this.orderUrl}/orders/${order.id}`, order)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  delete(order: Order) {
    return this.http.delete<Order>(`${this.orderUrl}/orders/${order.id}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  search(query: string, queryCategory:string) {
    const options = { params: new HttpParams().set('query', query).set("query_category", queryCategory) };
    return this.http.get<Order[]>(`${this.orderUrl}/orders/search`, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  deleteAll(query: string) {
    const options = { params: new HttpParams().set('query', query) };
    return this.http.delete<Order[]>(`${this.orderUrl}/orders/delete/all`, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // this.messageService.add(`[ERROR] An error occurred in OrderService: ${error.error}`)
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
