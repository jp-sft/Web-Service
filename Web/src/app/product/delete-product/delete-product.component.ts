import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../product.service";
import {MatTableDataSource} from "@angular/material/table";
import {MessageService} from "../../message.service";
import {FormGroup} from "@angular/forms";
import {ProductQuery} from "../product.component";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  @Input() productToDeleteForm! : FormGroup;
  @Output() deletedProductsEvent = new EventEmitter<Product[]>();


  constructor(private productService: ProductService, private messenger: MessageService) { }

  ngOnInit(): void {
  }


  deleteAll(){
    let query = this.productToDeleteForm.value['query'];
    this.productService.deleteAll(query)
      .subscribe((data : Product[]) => {
          this.deletedProductsEvent.emit(data);
          this.messenger.add(`[SEARCH] ${data.length} product(s)`)
        }
      )
  }
  onSubmit() {
    this.deleteAll();
  }

}
