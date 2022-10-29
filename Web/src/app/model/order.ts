import {Customer} from "./customer";
import {OrderLine} from "./order-line";

export interface Order {
    id: number | null;
    createdDate: Date | null;
    orderLines: OrderLine[];
    customer: Customer | null;
    status: string; //TODO: Create Status enum
  }
