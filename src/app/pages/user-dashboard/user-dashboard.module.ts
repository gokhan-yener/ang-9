import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDashboardRouting} from './user-dashboard.routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {LayoutComponent} from './partial/layout/layout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {PageModule} from '../page.module';
import {ProductAddComponent} from './product/product-add/product-add.component';
import {LSelect2Module} from 'ngx-select2';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    LayoutComponent,
    ProfileEditComponent,
    ProductAddComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRouting,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    PageModule,
    LSelect2Module,
  ],
  exports: []
})
export class UserDashboardModule {
}
