import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserDashboardComponent} from './user-dashboard.component';

const routes = [
  {
    path: 'profile',
    component: UserDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRouting {
}
