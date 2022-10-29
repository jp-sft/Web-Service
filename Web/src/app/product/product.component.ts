import { Component, OnInit } from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "../model/product";
import {ListProductComponent} from "./list-product/list-product.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../model/category";
import {MessageService} from "../message.service";

export interface ProductQuery{
  query: string,
  queryCategory: string
}
export enum actions{
  ADD, UPDATE, SEARCH
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [ListProductComponent],
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products! : Product[];
  productForm = new FormGroup({
    id: new FormControl<number>(-1),
    name: new FormControl<string>('Milk', [Validators.required]),
    weight: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>('ds', [Validators.required]),
    unitPrice: new FormControl<number | null>(3, [Validators.required]),
    category: new FormControl<Category | null>(null, [Validators.required]),
  });
  productToUpdateForm = new FormGroup({
    id: new FormControl<number>(-1, [Validators.required]),
    name: new FormControl<string>('Milk', [Validators.required]),
    weight: new FormControl<number>(0, [Validators.required]),
    description: new FormControl<string>('ds', [Validators.required]),
    unitPrice: new FormControl<number | null>(3, [Validators.required]),
    category: new FormControl<Category | null>(null, [Validators.required]),
  });
  // @ts-ignore
  productToSearchForm = new FormGroup<ProductQuery>({
    query: new FormControl<string>('Milk' ),
    queryCategory: new FormControl<string>(''),
  });
  productToDeleteForm = new FormGroup({
    query: new FormControl<string>('Milk', [Validators.required] )
  });
  productToUpdate : Product | undefined;
  productToDelete! : Product;

  categories: Category[] = [];
  action: string = 'ADD';
  actions: string[] = ['ADD', 'UPDATE', 'SEARCH', 'DELETE'];
  updateIsDisable: boolean = true;

  constructor(private productService: ProductService, private msgService: MessageService) { }

  ngOnInit(): void {
    this.clear()
    this.findAllCategory();
    this.findAll();
  }
  clear() {
    this.products = [];
    this.categories = [];
  }

  findAll() {
    this.productService.findAll()
      .subscribe((data : Product[]) => {
        this.products = data;
      })
  }
  findAllCategory() {
    this.productService.findAllCategory()
      .subscribe((data: Category[]) => this.categories = data);
  }
  setProductToUpdate(product: Product){
    this.action = 'UPDATE';
    this.productToUpdateForm.patchValue({
      id: product.id,
      name: product.name,
      weight: product.weight,
      description: product.description,
      unitPrice: product.unitPrice,
      category: product.category
    })
  }

  setAddedProduct(product: Product) {
    this.products = [product, ...this.products]
    this.action = 'UPDATE';
    this.productToUpdateForm.patchValue(product)
  }
  setUpdatedProduct(product: Product) {
    let updatedIndex = this.products.findIndex(item => item.id == product.id);
    this.products[updatedIndex] = product;
    this.products = [...this.products]
  }

  setProductToDelete(product: Product) {
    this.productToDelete = product;
    this.delete();
  }

  setSearchedProduct(products: Product[]) {
    this.products = [...products]
  }

  setDeletedProducts(productsDeleted: Product[]) {
    let ids = productsDeleted.map(value => value.id);
    this.products = [...this.products.filter(item => !(item.id in ids))]
  }


  private delete() {
    return this.productService.delete(this.productToDelete)
      .subscribe(value => {
        this.products = this.products.filter(item => item.id != this.productToDelete.id);
        this.products = [...this.products]
        this.msgService.add(`[DELETE] Product ${this.productToDelete.id}`)
      })
  }
}
