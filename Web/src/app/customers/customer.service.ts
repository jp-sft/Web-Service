import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {MessageService} from "../message.service";
import {environment} from "../../environments/environment";
import {Customer} from "../model/customer";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly customerUrl: string = '';

  constructor(private http: HttpClient, private messageService : MessageService) {
    this.customerUrl = environment.customerUrl;
  }

  findAll(){
    return this.http.get<Customer[]>(`${this.customerUrl}/customers`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  save(customer : any ) : Observable<Customer> {
    return this.http.post<Customer>(`${this.customerUrl}/customers`, customer)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCustomerImage(customerId : number){
    return this.http.get<any>(`${this.customerUrl}/customers/{customerId}/image`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCustomerImageUrl(customerId: number) {
    return `${this.customerUrl}/customers/${customerId}/image`;
  }

  update(customer: Customer) {
    return this.http.put<Customer>(`${this.customerUrl}/customers/${customer.id}`, customer)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  delete(customer: Customer) {
    return this.http.delete<Customer>(`${this.customerUrl}/customers/${customer.id}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  search(query: string) {
    const options = { params: new HttpParams().set('query', query) };
    return this.http.get<Customer[]>(`${this.customerUrl}/customers/search`, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  deleteAll(query: string) {
    const options = { params: new HttpParams().set('query', query) };
    return this.http.delete<Customer[]>(`${this.customerUrl}/customers/delete/all`, options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // this.messageService.add(`[ERROR] An error occurred in CustomerService: ${error.error}`)
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
