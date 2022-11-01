import {Component, OnInit} from '@angular/core';
import {customControlOrderForm, Order, OrderForm, OrderStatus} from "../model/order";
import {MessageService} from "../message.service";
import {OrderService} from "./orders.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer";
import {OrderLine} from "../model/order-line";
import {Product} from "../model/product";


export enum ACTIONS {NONE, ADD, UPDATE, SEARCH, DELETE}

/*
* Principe des vue --> chaque vue enfant envoie un évenement à ce composant
*
 */
export enum VIEW_TYPES {LIST, FORM, GRAPH, SEARCH}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  /* Valeurs par défaut
  * **** ACTIONS {NONE, ADD, UPDATE, SEARCH, DELETE}
  *       example: on enregistre le formulaire si l'action est ADD ou bien UPDATE
  * **** VIEW_TYPES {LIST, FORM, GRAPH, SEARCH}
  * */
  ACTIONS = ACTIONS;
  action = ACTIONS.NONE; // Pas d'action jusqu'au click
  VIEW_TYPES = VIEW_TYPES;
  viewType = VIEW_TYPES.LIST; // La vue qui doit s'afficher par défaut

  // For Form
  orderForm: FormGroup = OrderForm.getFormGroup();

  // For List
  orders: Order[] = [];
  orderSelected: Order | null = null; // Pour la commande sélectionnée

  // For Search
  statusFilter!: OrderStatus;
  customersFilterMapByFullName = new Map(); // customer_id --> fullname


  constructor(private orderService: OrderService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.findAllOrder();
  }

  findAllOrder() {
    this.orderService.findAll()
      .subscribe((data: Order[]) => {
        this.orders = data;
        let customers = this.orders.map(value => value.customer);
        for (let customer of customers) {
          if (customer) {
            let fullName = customer.firstName + " " + customer.lastName;
            console.log(fullName)
            this.customersFilterMapByFullName.set(fullName, customer.id);
          }
        }
      })
  }

  saveCurentOrder() {
    this.action = ACTIONS.ADD;
  }

  saveOrder($event: Order) {
    this.orderService.save($event).subscribe(data => {
      this.orders = [$event, ...this.orders]
      this.action = ACTIONS.NONE;
      this.viewType = VIEW_TYPES.LIST;
      this.orderForm = OrderForm.getFormGroup()
      this.messageService.add(`[ADD] order :${JSON.stringify($event)}`);
    })
  }

  updateCurentOrder() {
    this.action = ACTIONS.UPDATE;
  }

  updateOrder($event: Order) {
    this.orderService.update($event).subscribe(data => {
      this.orders = [$event, ...this.orders.filter(value => value.id != $event.id)]
      this.action = ACTIONS.NONE;
      this.viewType = VIEW_TYPES.LIST;
      this.orderForm = OrderForm.getFormGroup()
      this.messageService.add(`[UPDATE] order :${JSON.stringify($event)}`);

    })
  }

  deleteCurentOrder() {
    if (this.orderSelected)
      this.deleteOrder(this.orderSelected);
  }

  deleteOrder($event: Order) {
    this.orderService.delete($event).subscribe(data => {
      this.orders = [...this.orders.filter(value => value.id != $event.id)];
      this.action = ACTIONS.NONE;
      this.viewType = VIEW_TYPES.LIST;
      this.messageService.add(`[DELETE] order :${JSON.stringify($event)}`);
    })
  }

  setStatusFiltered($event: OrderStatus) {
    this.orders = this.orders.filter(order => {
      return order.status.toUpperCase() == $event.toUpperCase();
    })
  }

  setCustomerFiltered($event: number) {
    this.orders = this.orders.filter(order => {
      return order.customer?.id == $event;
    })
  }

  /* Mise à jour du formulaire avec les valeurs dans "order" */
  setOrderForm(order: Order) {
    // this.action = 'UPDATE';
    this.orderForm.patchValue(order)
  }

  cancelSaveOrder() {
    this.viewType = VIEW_TYPES.LIST;
  }

  editOrderSelected() {
    // @ts-ignore
    this.orderForm.patchValue(this.orderSelected);
    this.viewType = VIEW_TYPES.FORM;
  }

  setOrdersSelected($event: Order | null) { // --> envoie par la liste
    this.orderSelected = $event;
  }
}
