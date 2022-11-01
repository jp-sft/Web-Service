import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
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
  @Output() customerIdFilterEvent = new EventEmitter<number>();
  @Input() customersFilterMapByFullName = new Map();

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

          // @ts-ignore
        if (this.customersFilterMapByFullName.has(value.trim())) {
            this.customerIdFilterEvent.emit(this.customersFilterMapByFullName.get(value))
          }
        return Array.from(this.customersFilterMapByFullName.keys()) as string[];
        }
      ))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsStatus.filter(option => option.toLowerCase().includes(filterValue));
  }

  // private _filter_customer(param: A | string) {
  //   return [];
  // }
}
