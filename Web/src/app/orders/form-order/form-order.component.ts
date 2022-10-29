import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Order} from "../../model/order";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MessageService} from "../../message.service";
import {OrderService} from "../orders.service";
import {Product} from "../../model/product";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../customers/customer.service";
import {ProductService} from "../../product/product.service";
import {OrderLine} from "../../model/order-line";
import {MatTable, MatTableDataSource} from "@angular/material/table";


export const customControlOrderLineForm2 = {
  id: new FormControl<number | null>(null),
  quantity: new FormControl<number>(0),
  taxStatus: new FormControl<string | null>('CREATED'),
  weight: new FormControl<number>(0),
  subTotal: new FormControl<number>(0),
  product: new FormControl<Product | null>(null)
}

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {

  private order!: Order;
  @Input() saveClicked!: boolean;
  @Input() dataSource!: FormGroup;
  @Output() addedOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();
  @Output() updatedOrderEvent: EventEmitter<Order> = new EventEmitter<Order>();
  @Input() action!: string;
  @ViewChild('table') table!: MatTable<Customer>;
  customers: Customer[] = [];
  products: Product[] = [];
  // orderLineDataSource: FormGroup = new FormGroup(customControlOrderLineForm);
  // orderLines: OrderLine[] = [];
  // orderLinesFormArray!: FormArray;
  orderLineFormGroup!: FormGroup;
  columns = ["subTotal", "product", "weight", "weight", "quantity"];
  columnsToDisplayWithExpand = [...this.columns]; //, 'action'

  get orderLines() : FormArray{
    // console.log( this.dataSource.get('orderLines') as FormArray)
    return this.dataSource.get('orderLines') as FormArray;
  };
  addNewOrderLine() {
    (this.dataSource.get('orderLines') as FormArray).push(OrderLine.asFormGroup(new OrderLine()))
    console.log(this.dataSource.get('orderLines')?.value)
    // @ts-ignore
    this.table.dataSource = new MatTableDataSource(this.dataSource.get('orderLines').controls);
    this.table.renderRows();

  }

  constructor(private customerService: CustomerService,
              private productService: ProductService,
              private orderService: OrderService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.customerService.findAll()
      .subscribe(value => this.customers = value);
    this.productService.findAll()
      .subscribe(value => this.products = value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['action'] != undefined && !changes['action'].isFirstChange()) {
      this.action = changes['action'].currentValue
    }
    if (changes['saveClicked'] != undefined && !changes['saveClicked'].isFirstChange()) {
      this.saveClicked = changes['saveClicked'].currentValue
      if (this.saveClicked)
        this.onSubmit()
    }
  }

  addOrderLine() {
    this
  }

  onSubmit() {
    console.log("SUMMMMMMMMMMMMMMMMMMMMMMMMMMMMMIt")
    console.log(this.dataSource.valid)
    console.log(this.dataSource.value)
    // if (this.dataSource.valid) {
    //   this.order = (this.dataSource.value as Order);
    //   if (this.action == 'ADD') {
    //     this.order.id = null;
    //     this.orderService.save(this.order)
    //       .subscribe((data: Order) => {
    //         this.order = data;
    //         this.messageService.add(`[ADD] order :${JSON.stringify(this.order)}`);
    //         this.addedOrderEvent.emit(data);
    //       })
    //   }
    //   else if(this.action == 'UPDATE') {
    //     this.orderService.save(this.order)
    //       .subscribe((data: Order) => {
    //         this.order = data;
    //         this.messageService.add(`[UPDATE] order :${JSON.stringify(this.order)}`);
    //         this.updatedOrderEvent.emit(data);
    //       })
    //   }
    // }
  }

  onSubmitOrderLine() {
    // let currentOrderLine = this.orderLineDataSource.value as OrderLine;
    console.log(this.dataSource)
    // this.dataSource.patchValue({
    //   "orderLines" : [this.dataSource.get('orderLines'), currentOrderLine]
    // })
  }
}
