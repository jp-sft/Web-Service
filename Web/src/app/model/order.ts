import {Customer} from "./customer";
import {OrderLine} from "./order-line";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

export interface Order {
  id: number | null;
  createdDate: Date | null;
  orderLines: OrderLine[];
  customer: Customer | null;
  status: string; //TODO: Create Status enum
}

export enum OrderStatus {
  CREATED = 'CREATED',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  PAID = 'PAID'
}

export enum SearchOrderBy {
  CUSTOMER = 'CUSTOMER',
  STATUS = 'STATUS'
}

export class OrderForm {
  private formGroup!: FormGroup;

  public static getFormGroup() {
    return new FormGroup({
        id: new FormControl<number | null>(null),
        createdDate: new FormControl<Date | null>(null),
        status: new FormControl<string | null>('CREATED'),
        customer: new FormControl<Customer | null>(null),
        orderLines: new FormArray([OrderLine.asFormGroup(new OrderLine())])
      }
    )
  }
}

export const customControlOrderForm = {
  id: new FormControl<number | null>(null),
  createdDate: new FormControl<Date | null>(null),
  status: new FormControl<string | null>('CREATED'),
  customer: new FormControl<Customer | null>(null),
  orderLines: new FormArray([OrderLine.asFormGroup(new OrderLine())])
}
