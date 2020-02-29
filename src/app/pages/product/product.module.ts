import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {ProductRouting} from './product.routing.module';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRouting
  ]
})
export class ProductModule { }
