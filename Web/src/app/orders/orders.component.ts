import { Component, OnInit } from '@angular/core';
import {Order} from "../model/order";
import {MessageService} from "../message.service";
import {OrderService} from "./orders.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer";
import {OrderLine} from "../model/order-line";
import {Product} from "../model/product";


export const customControlOrderForm = {
  id: new FormControl<number | null>(null),
  createdDate: new FormControl<Date | null>(null),
  status: new FormControl<string | null>('CREATED'),
  customer: new FormControl<Customer | null>(null),
  orderLines: new FormArray([])
}
export const customControlOrderLineForm = {
  id: new FormControl<number | null>(null),
  quantity: new FormControl<number>(0),
  taxStatus: new FormControl<string | null>('CREATED'),
  weight: new FormControl<number>(0),
  subTotal: new FormControl<number>(0),
  product: new FormControl<Product | null>(null)
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderSelected: Order | null = null;
  orders: Order[] = [];
  orderForm: FormGroup = new FormGroup(customControlOrderForm);

  saveClicked: boolean = false;

  viewType: string = 'LIST';
  viewTypes: string[] = ['LIST', 'FORM', 'GRAPH'];

  action: string = 'ADD';
  actions: string[] = ['ADD', 'UPDATE', 'SEARCH', 'DELETE'];


  constructor(private orderService: OrderService, private msgService: MessageService) { }

  ngOnInit(): void {
    let fgs = [OrderLine.asFormGroup(new OrderLine())]
    this.orderForm.setControl('orderLines', new FormArray(fgs));
    this.findAll();
  }

  findAll() {
    this.orderService.findAll()
      .subscribe((data : Order[]) => {
        this.orders = data;
      })
  }
  setOrderForm(order: Order){
    // this.action = 'UPDATE';
    this.orderForm.patchValue(order)
  }

  setAddedOrder(order: Order) {
    this.orders = [order, ...this.orders]
    this.action = 'UPDATE';
    this.viewType = 'LIST';
    this.orderForm.patchValue(order)
  }

  setOrdersSelected(order: Order|null) {
    this.orderSelected = order;
  }

  saveOrder() {
    this.saveClicked = true;
    console.log(this.orderSelected)
  }

  cancelSaveOrder() {
    this.viewType = 'LIST';
  }
}
