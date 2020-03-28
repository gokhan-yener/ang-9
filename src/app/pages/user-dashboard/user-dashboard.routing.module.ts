import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {LayoutComponent} from './partial/layout/layout.component';
import {ProductAddComponent} from './product/product-add/product-add.component';

const routes = [
  {
    path: 'products',
    component: LayoutComponent, children: [
      {path: '', component: ProductListComponent}
    ]
  },
  {
    path: 'product-edit/:id/:category', component: LayoutComponent, children: [
      {path: '', component: ProductEditComponent}
    ]
  },
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: ProfileEditComponent}
    ]
  },
  {
    path: 'product-add', component: LayoutComponent, children: [
      {path: '', component: ProductAddComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRouting {
}
