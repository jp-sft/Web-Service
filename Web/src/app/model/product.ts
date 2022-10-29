import {Category} from "./category";
import {FormControl} from "@angular/forms";

export interface Product {
  id: number
  name: string
  weight: number
  description: string
  unitPrice: number
  category: Category
}


