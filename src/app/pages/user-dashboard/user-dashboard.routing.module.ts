import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListComponent} from './product/list/list.component';
import {AddComponent} from './product/add/add.component';
import {EditComponent} from './product/edit/edit.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';

const routes = [
  {
    path: 'products',
    component: ListComponent
  },
  {
    path: 'products/add', component: AddComponent,
  },
  {
    path: 'products/edit',
    component: EditComponent
  },
  {
    path: '',
    component: ProfileEditComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRouting {
}
