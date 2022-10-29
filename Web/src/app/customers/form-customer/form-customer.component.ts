import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Customer} from "../../model/customer";
import {Category} from "../../model/category";
import {FormGroup} from "@angular/forms";
import {MessageService} from "../../message.service";
import {CustomerService} from "../customer.service";
import {customControlCustomerForm} from "../customers.component";
import {actions} from "../../product/product.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {

  private customer: Customer | undefined;
  @Input() dataSource!: FormGroup;
  @Output() addedCustomerEvent: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Output() updatedCustomerEvent: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Input() action!: string;
  @Output() changedActionEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private customerService: CustomerService, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['action'] != undefined && !changes['action'].isFirstChange()) {
      this.action = changes['action'].currentValue
    }
  }

  onSubmit() {
    if (this.dataSource.valid) {
      this.customer = (this.dataSource.value as Customer);
      if (this.action == 'ADD') {
        this.customer.id = null;
        this.customerService.save(this.customer)
          .subscribe((data: Customer) => {
            this.customer = data;
            this.messageService.add(`[ADD] customer :${JSON.stringify(this.customer)}`);
            this.addedCustomerEvent.emit(data);
          })
      }
      else if(this.action == 'UPDATE') {
        this.customerService.save(this.customer)
          .subscribe((data: Customer) => {
            this.customer = data;
            this.messageService.add(`[UPDATE] customer :${JSON.stringify(this.customer)}`);
            this.updatedCustomerEvent.emit(data);
          })
      }
    }
  }

  setFormToAdd() {
    this.changedActionEvent.emit("ADD");
  }
}
