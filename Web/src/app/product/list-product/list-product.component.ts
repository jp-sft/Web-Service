import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../../model/product";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTable, MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  providers: [ProductService],
  styleUrls: ['./list-product.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListProductComponent implements OnInit {

  @Input() products: Product[] = [];
  @Output() updateProductEvent = new EventEmitter<Product>();
  @Output() deletedProductEvent = new EventEmitter<Product>();

  @ViewChild('table') table!: MatTable<Product>;
  displayedColumns: string[] = ['id', 'name', 'weight', 'unitPrice', 'category'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Product | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!changes['products'].firstChange) {
      this.products = changes['products'].currentValue
      this.table.dataSource = new MatTableDataSource(this.products);
      this.table.renderRows();
    }
  }

  updateProduct(product: Product) {
    this.updateProductEvent.emit(product);
  }

  getProductUrl(productId: number): string {
    return this.productService.getProductImageUrl(productId)
  }

  deleteProduct(product: Product) {
    this.deletedProductEvent.emit(product);
  }
}
