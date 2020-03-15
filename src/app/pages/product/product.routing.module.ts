import { RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

const routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'detail/:id/:category/:description/:city',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRouting {
}
