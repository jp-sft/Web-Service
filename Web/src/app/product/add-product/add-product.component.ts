import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category";
import {ProductService} from "../product.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Product} from "../../model/product";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private product: Product | undefined;
  @Input() categories: Category[] = [];
  @Input() productForm!: FormGroup;
  @Output() addedProductEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private productService: ProductService, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.product = (this.productForm.value as Product);
      this.productService.save(this.product)
        .subscribe((data: Product) => {
            this.product = data;
            this.messageService.add(`[ADD] product :${JSON.stringify(this.product)}`);
            this.addedProductEvent.emit(data);
          })
    }
  }
}
