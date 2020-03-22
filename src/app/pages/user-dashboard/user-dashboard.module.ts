import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDashboardRouting} from './user-dashboard.routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ListComponent} from './product/list/list.component';
import {EditComponent} from './product/edit/edit.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {LayoutComponent} from './partial/layout/layout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {PageModule} from '../page.module';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    LayoutComponent,
    ProfileEditComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRouting,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    PageModule
  ],
  exports: [
  ]
})
export class UserDashboardModule {
}
