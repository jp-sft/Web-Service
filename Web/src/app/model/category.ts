import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface Category {
  id: number
  name: string
  description: string
  parent: Category | undefined
}
