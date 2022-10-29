import {Component, OnInit} from '@angular/core';
import {Customer} from "../model/customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../message.service";
import {CustomerService} from "./customer.service";

export const customControlCustomerForm = {
  id: new FormControl<number | null>(null),
  login: new FormControl<string | null>('cust1'),
  password: new FormControl<string | null>('cust1'),
  rePassword: new FormControl<string | null>('cust1'),
  createdDate: new FormControl<Date | null>(null),
  profileUrl: new FormControl<string | null>(null),
  firstName: new FormControl<string>('cust1', [Validators.required]),
  lastName: new FormControl<string>('cust1', [Validators.required]),
  dateOfBirth: new FormControl<Date>(new Date(), [Validators.required]),
  sex: new FormControl<string>('Male', [Validators.required]),
  email: new FormControl<string>('fakke@fake.com', [Validators.required]),
  phoneNumber: new FormControl<string>('+21623586932', [Validators.required]),
  address: new FormControl<string>('Romar, 5km Rue Bastar', [Validators.required]),
  city: new FormControl<string>('Plek', [Validators.required])
};

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerForm = new FormGroup(customControlCustomerForm);
  customerEditForm = new FormGroup(customControlCustomerForm);
  customerToUpdateForm = new FormGroup(customControlCustomerForm);
  customerToSearchForm = new FormGroup({
    query: new FormControl<string>('Milk', [Validators.required])
  });
  customerToDeleteForm = new FormGroup({
    query: new FormControl<string>('Milk', [Validators.required])
  });
  customerToUpdate: Customer | undefined;
  customers!: Customer[];
  customerToDelete!: Customer;
  action: string = 'ADD';
  actions: string[] = ['ADD', 'UPDATE', 'SEARCH', 'DELETE'];
  updateIsDisable: boolean = true;
  dataSource = this.customerForm;

  constructor(private customerService: CustomerService, private msgService: MessageService) {
  }

  ngOnInit(): void {
    this.clear()
    this.findAll();
  }

  clear() {
    this.customers = [];
  }

  findAll() {
    this.customerService.findAll()
      .subscribe((data: Customer[]) => {
        this.customers = data;
      })
  }

  setCustomerToUpdate(customer: Customer) {
    this.action = 'UPDATE';
    this.customerToUpdateForm.patchValue(customer)
    this.dataSource = this.customerToUpdateForm;
  }

  setAddedCustomer(customer: Customer) {
    this.customers = [customer, ...this.customers]
    // this.action = 'DETAIL';
    // this.customerToUpdateForm.patchValue(customer)
    this.dataSource = this.customerForm;
  }

  setUpdatedCustomer(customer: Customer) {
    let updatedIndex = this.customers.findIndex(item => item.id == customer.id);
    this.customers[updatedIndex] = customer;
    this.customers = [...this.customers]
    this.resetDataSource();
  }

  setCustomerToDelete(customer: Customer) {
    this.customerToDelete = customer;
    this.delete();
  }

  setSearchedCustomer(customers: Customer[]) {
    this.customers = [...customers]
  }

  setDeletedCustomers(customersDeleted: Customer[]) {
    let ids = customersDeleted.map(value => value.id);
    // @ts-ignore
    this.customers = [...this.customers.filter(item => !(item.id in ids))]
  }


  private delete() {
    return this.customerService.delete(this.customerToDelete)
      .subscribe(value => {
        this.customers = this.customers.filter(item => item.id != this.customerToDelete.id);
        this.customers = [...this.customers]
        this.msgService.add(`[DELETE] Customer ${this.customerToDelete.id}`)
      })
  }

  changeActionToAdd(action: string) {
    this.action = 'ADD';
    this.resetDataSource();
  }

  private resetDataSource() {
    this.dataSource = new FormGroup({
      id: new FormControl<number | null>(null),
      login: new FormControl<string | null>('cust1'),
      password: new FormControl<string | null>('cust1'),
      rePassword: new FormControl<string | null>('cust1'),
      createdDate: new FormControl<Date | null>(null),
      profileUrl: new FormControl<string | null>(null),
      firstName: new FormControl<string>('cust1', [Validators.required]),
      lastName: new FormControl<string>('cust1', [Validators.required]),
      dateOfBirth: new FormControl<Date>(new Date(), [Validators.required]),
      sex: new FormControl<string>('Male', [Validators.required]),
      email: new FormControl<string>('fakke@fake.com', [Validators.required]),
      phoneNumber: new FormControl<string>('+21623586932', [Validators.required]),
      address: new FormControl<string>('Romar, 5km Rue Bastar', [Validators.required]),
      city: new FormControl<string>('Plek', [Validators.required])
    });
  }
}
