import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import {UserDashboardRouting} from './user-dashboard.routing.module';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    UserDashboardRouting,
    SharedModule
  ]
})
export class UserDashboardModule { }
