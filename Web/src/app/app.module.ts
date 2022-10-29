import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ConfigComponent } from './config/config.component';
import { ProductComponent } from './product/product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { SearchProductComponent } from './product/search-product/search-product.component';
import { GetProductComponent } from './product/get-product/get-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { MessagesComponent } from './messages/messages.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRadioModule} from "@angular/material/radio";
import {MatListModule} from "@angular/material/list";
import {MessageService} from "./message.service";
import {httpInterceptorProviders} from "./http-interceptors";
import { OrdersComponent } from './orders/orders.component';
import { ListOrderComponent } from './orders/list-order/list-order.component';
import { FormOrderComponent } from './orders/form-order/form-order.component';
import { CustomersComponent } from './customers/customers.component';
import { FormCustomerComponent } from './customers/form-customer/form-customer.component';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';
import { AccountingComponent } from './accounting/accounting.component';
import { SearchOrderComponent } from './orders/search-order/search-order.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    ProductComponent,
    ListProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    SearchProductComponent,
    GetProductComponent,
    MessagesComponent,
    OrdersComponent,
    ListOrderComponent,
    FormOrderComponent,
    CustomersComponent,
    FormCustomerComponent,
    ListCustomerComponent,
    AccountingComponent,
    SearchOrderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        //import HttpClientModule after BrowserModule.
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatRadioModule,
        FormsModule,
        MatListModule,
        MatCheckboxModule,

    ],
  providers: [
    MessageService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
