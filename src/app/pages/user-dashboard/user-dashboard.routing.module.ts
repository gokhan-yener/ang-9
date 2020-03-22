import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListComponent} from './product/list/list.component';
import {AddComponent} from './product/add/add.component';
import {EditComponent} from './product/edit/edit.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {LayoutComponent} from './partial/layout/layout.component';

const routes = [
  {
    path: 'products',
    component: LayoutComponent, children: [
      {path: '', component: ListComponent}
    ]
  },
  {
    path: 'product/add', component: LayoutComponent, children: [
      {path: '', component: AddComponent}
    ]
  },
  {
    path: 'product/edit', component: LayoutComponent, children: [
      {path: '', component: EditComponent}
    ]
  },
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: ProfileEditComponent}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRouting {
}
