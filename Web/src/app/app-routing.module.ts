import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigComponent} from "./config/config.component";
import {ProductComponent} from "./product/product.component";
import {CustomersComponent} from "./customers/customers.component";
import {OrdersComponent} from "./orders/orders.component";

const routes: Routes = [
  {path:'config' ,component: ConfigComponent},
  {path:'products' ,component: ProductComponent},
  {path:'customers' ,component: CustomersComponent},
  {path:'orders' ,component: OrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
