import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductRouting} from './product.routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [ ProductDetailComponent, ProductsComponent],
    imports: [
        CommonModule,
        ProductRouting,
        SharedModule,
    ]
})
export class ProductModule { }
