import { RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductComponent} from './product.component';

const routes = [
  {
    path: 'urunler',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRouting {
}
