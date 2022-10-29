import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../product.service";
import {query} from "@angular/animations";
import {Product} from "../../model/product";
import {MessageService} from "../../message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category";
import {ProductQuery} from "../product.component";

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  // @ts-ignore
  @Input() productToSearchForm! : FormGroup<ProductQuery>;
  @Output() searchedProductEvent = new EventEmitter<Product[]>();

  constructor(private productService : ProductService,private messageService: MessageService) { }

  ngOnInit(): void {
  }

  search(){
    let query = this.productToSearchForm.value['query'];
    let queryCategory = this.productToSearchForm.value['queryCategory'];
    // @ts-ignore
    this.productService.search(query, queryCategory)
      .subscribe((data : Product[]) => {
          this.searchedProductEvent.emit(data);
          this.messageService.add(`[SEARCH] ${data.length} product(s)`)
        }
      )
  }

  onSubmit() {
    this.search();
  }
}
