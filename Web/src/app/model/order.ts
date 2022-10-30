import {Customer} from "./customer";
import {OrderLine} from "./order-line";

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
  CUSTOMER= 'CUSTOMER',
  STATUS = 'STATUS'
}
