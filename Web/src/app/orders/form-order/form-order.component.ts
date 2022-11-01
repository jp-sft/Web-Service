import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Order} from "../../model/order";
import {FormArray, FormGroup} from "@angular/forms";
import {Product} from "../../model/product";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../customers/customer.service";
import {ProductService} from "../../product/product.service";
import {OrderLine} from "../../model/order-line";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ACTIONS} from "../orders.component";


@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {

  @Input() action!: ACTIONS;
  @Input() dataSource!: FormGroup;
  @Output() addedOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() updatedOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();
  @ViewChild('table') table!: MatTable<Customer>;
  customers: Customer[] = [];
  products: Product[] = [];
  columns = ["subTotal", "product", "taxStatus", "weight", "quantity"];
  columnsToDisplayWithExpand = [...this.columns]; //, 'action'
  private order!: Order
  compareFunction(o1: any, o2: any): boolean{
    return ( o1.id == o2.id);
  };

  ngOnInit(): void{
    this.customerService.findAll()
      .subscribe(value => this.customers = value);
    this.productService.findAll()
      .subscribe(value => this.products = value);
  }

  get orderLines() : FormArray{
    console.log(this.dataSource.get('orderLines') as FormArray)
    return this.dataSource.get('orderLines') as FormArray;
  };

  addNewOrderLine() {
    (this.dataSource.get('orderLines') as FormArray).push(OrderLine.asFormGroup(new OrderLine()))
    // @ts-ignore
    this.table.dataSource = new MatTableDataSource(this.dataSource.get('orderLines').controls);
    this.table.renderRows();
  }

  constructor(private customerService: CustomerService,
              private productService: ProductService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['action'] != undefined && !changes['action'].isFirstChange()) {
      this.action = changes['action'].currentValue
      console.log(this.action)
      if (this.action == ACTIONS.ADD || this.action == ACTIONS.UPDATE) {
        this.submit();
      }
    }
  }

  submit() {
    console.log(this.dataSource.valid)
    console.log(this.dataSource.value)
    if (this.dataSource.valid) {
      this.order = (this.dataSource.value as Order);
      console.log(this.dataSource.value['id'])
      console.log(this.order.id)
      if (this.action == ACTIONS.ADD && this.order.id == null) {
        this.addedOrderEvent.emit(this.order);
      }
      else if (this.action == ACTIONS.ADD && this.order.id != null) {
        this.updatedOrderEvent.emit(this.order);
      }
    }
  }
}
