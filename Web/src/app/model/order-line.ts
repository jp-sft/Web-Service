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
  productId: number | undefined;

  static asFormGroup(orderLine: OrderLine): FormGroup {
    return new FormGroup({
      id: new FormControl(orderLine.id),
      quantity: new FormControl(orderLine.quantity, Validators.required),
      taxStatus: new FormControl(orderLine.taxStatus),
      weight: new FormControl(orderLine.weight),
      subTotal: new FormControl(orderLine.subTotal, Validators.required),
      product: new FormControl(orderLine.product),
      productId: new FormControl(orderLine.productId, Validators.required)
    });
  }
}

export const
  customControlOrderLineForm = {
    id: new FormControl<number | null>(null),
    quantity: new FormControl<number>(0),
    taxStatus: new FormControl<string | null>('CREATED'),
    weight: new FormControl<number>(0),
    subTotal: new FormControl<number>(0),
    product: new FormControl<Product | null>(null),
    productId: new FormControl<number | null>(null)
  }
