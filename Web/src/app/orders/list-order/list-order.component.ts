import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Order, OrderStatus} from "../../model/order";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Product} from "../../model/product";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  @Input() orders!: Order[];
  @Output() orderSelectedEvent = new EventEmitter<Order|null>()

  @ViewChild('table') table!: MatTable<Order>;
  rowClicked: number | null = -1;
  displayedColumns=  ["id", "customer", "ordersLine", "createdDate", "status"];
  columnsToDisplayWithExpand = [...this.displayedColumns];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['orders'].firstChange) {
      this.orders = changes['orders'].currentValue
      this.table.dataSource = new MatTableDataSource(this.orders);
      this.table.renderRows();
    }
  }

  setOrderSelected(order : Order){
    this.orderSelectedEvent.emit(order);
  }


  selectRow(order: Order) {
    if(this.rowClicked === order.id) {
      this.rowClicked = -1;
      this.orderSelectedEvent.emit(null);
    }
    else {
      this.rowClicked = order.id;
      this.orderSelectedEvent.emit(order);
    }
  }
}
