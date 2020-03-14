import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductRouting} from './product.routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { FilterComponent } from './products/filter/filter.component';
import {LSelect2Module} from 'ngx-select2';
import {FormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [ ProductDetailComponent, ProductsComponent, FilterComponent],
  imports: [
    CommonModule,
    ProductRouting,
    SharedModule,
    LSelect2Module,
    NgxPaginationModule,
    FormsModule,
  ]
})
export class ProductModule { }
