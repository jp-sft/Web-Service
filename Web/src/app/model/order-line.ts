import {Product} from "./product";
import {FormControl, FormGroup, Validators} from "@angular/forms";

// export interface OrderLine {
//   id: number | undefined;
//   quantity: number;
//   taxStatus: string | undefined;
//   weight: number | undefined;
//   subTotal: number;
//   product: Product;
// }

export class OrderLine {
  id: number | undefined;
  quantity: number | undefined;
  taxStatus: string | undefined;
  weight: number | undefined;
  subTotal: number | undefined;
  product: Product | undefined;

  static asFormGroup(orderLine: OrderLine): FormGroup {
    return new FormGroup({
      id: new FormControl(orderLine.quantity),
      quantity: new FormControl(orderLine.quantity, Validators.required),
      taxStatus: new FormControl(orderLine.weight, Validators.required),
      weight: new FormControl(orderLine.subTotal, Validators.required),
      subTotal: new FormControl(orderLine.product, Validators.required),
      product: new FormControl(orderLine.product, Validators.required)
    });
  }
}
