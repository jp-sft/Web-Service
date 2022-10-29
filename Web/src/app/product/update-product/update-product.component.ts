import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../model/product";
import {Category} from "../../model/category";
import {FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  @Input() product!: Product;
  @Input() productToUpdate!: Product;
  @Input() categories: Category[] = [];
  @Input() productForm!: FormGroup;
  @Output() updatedProductEvent = new EventEmitter<Product>();

  constructor(private productService: ProductService, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    //TODO: Check id
    if (this.productForm.valid) {
      this.product = (this.productForm.value as Product);
      this.productService.update(this.product)
        .subscribe((data: Product) => {
            this.product = data;
            this.updatedProductEvent.emit(this.product);
            this.messageService.add(`[UPDATE] product :${JSON.stringify(this.product)}`)
          })
    }
  }

}
