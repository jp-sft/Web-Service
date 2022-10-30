import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validator} from "@angular/forms";
import {Order, OrderStatus, SearchOrderBy} from "../../model/order";
import {map, Observable, startWith} from "rxjs";
import {Customer} from "../../model/customer";

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent implements OnInit {

  // Input & Output
  @Output() statusFilterEvent = new EventEmitter<OrderStatus>();
  @Output() customerFilterEvent = new EventEmitter<Customer>();
  @Input()  orders! : Order[];

  // Form Model && Control
  byStatusControl = new FormControl<string>('')
  byCustomerControl = new FormControl<string>('')
  by = new FormControl<string>('')

  // Form Data && Options
  optionsStatus = Object.values(OrderStatus);
  byValues = Object.values(SearchOrderBy);
  filteredOptionsStatus!: Observable<string[]>;
  filteredOptionsCustomer!: Observable<Set<Customer>>;

  // Other

  SearchOrderBy = SearchOrderBy;

  constructor() {
  }

  ngOnInit(): void {
    // Mapage entre  les nom de clients et leurs Id pour le filtre

    this.filteredOptionsStatus = this.byStatusControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value != null && value in OrderStatus) {
          let status = Object.values(OrderStatus).filter(k => k == value)[0];
          this.statusFilterEvent.emit(status)
        }
        return this._filter(value || '')
      }),
    );
    // @ts-ignore
    this.filteredOptionsCustomer = this.byCustomerControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        let customers = this.orders.map(o => o.customer);
        // @ts-ignore
        let customers_name = new Set(customers.map(c =>(c.firstName + ' ' + c.lastName).toLowerCase()));
        if (value != null && customers_name.has(value.toLowerCase())) {
          customers.forEach(cust => {
            console.log(JSON.stringify(cust))
          })
        }
        return new Set(customers)
      }),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsStatus.filter(option => option.toLowerCase().includes(filterValue));
  }

  // private _filter_customer(param: A | string) {
  //   return [];
  // }
}
