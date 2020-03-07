import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserDashboardRouting} from './user-dashboard.routing.module';
import {SharedModule} from '../../shared/shared.module';
import { AddComponent } from './product/add/add.component';
import { ListComponent } from './product/list/list.component';
import { EditComponent } from './product/edit/edit.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';



@NgModule({
  declarations: [ AddComponent, ListComponent, EditComponent, ProfileEditComponent],
  imports: [
    CommonModule,
    UserDashboardRouting,
    SharedModule
  ]
})
export class UserDashboardModule { }
