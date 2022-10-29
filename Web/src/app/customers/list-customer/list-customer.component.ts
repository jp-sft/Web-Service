import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Customer} from "../../model/customer";
import {CustomerService} from "../customer.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListCustomerComponent implements OnInit {

  @Input() customers: Customer[] = [];
  @Output() updateCustomerEvent = new EventEmitter<Customer>();
  @Output() deletedCustomerEvent = new EventEmitter<Customer>();
  @ViewChild('table') table!: MatTable<Customer>;
  displayedColumns: string[] = [
    'id',
    // 'login',
    // 'password',
    // 'rePassword',
    // 'createdDate',
    // 'profileUrl',
    'firstName',
    'lastName',
    // 'dateOfBirth',
    'sex',
    'email',
    // 'phoneNumber',
    // 'address',
    // 'city',
  ];
  displayedColumnsDetails = [
    // 'id',
    // 'login',
    // 'password',
    // 'rePassword',
    // 'createdDate',
    // 'profileUrl',
    'firstName',
    'lastName',
    // 'dateOfBirth',
    'sex',
    // 'email',
    // 'phoneNumber',
    // 'address',
    'city',
  ];
  displayedColumnsDetails2 = [
    // 'id',
    // 'login',
    // 'password',
    // 'rePassword',
    'createdDate',
    // 'profileUrl',
    // 'firstName',
    // 'lastName',
    'dateOfBirth',
    // 'sex',
    // 'email',
    'phoneNumber',
    'address',
    // 'city',
  ];
  columnsToDisplayWithExpand = ['image', ...this.displayedColumns, 'expand'];
  expandedElement: Customer | undefined;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['customers'].firstChange) {
      this.customers = changes['customers'].currentValue
      this.table.dataSource = new MatTableDataSource(this.customers);
      this.table.renderRows();
    }
  }

  updateCustomer(customer: Customer) {
    this.updateCustomerEvent.emit(customer);
  }

  getCustomerImageUrl(customerId: number): string {
    return this.customerService.getCustomerImageUrl(customerId)
  }

  deleteCustomer(customer: Customer) {
    this.deletedCustomerEvent.emit(customer);
  }

}
