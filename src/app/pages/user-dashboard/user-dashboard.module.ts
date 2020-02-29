import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import {UserDashboardRouting} from './user-dashboard.routing.module';



@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    UserDashboardRouting
  ]
})
export class UserDashboardModule { }
