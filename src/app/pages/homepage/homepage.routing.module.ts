import {Router, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage.component';
import {NgModule} from '@angular/core';

const routes = [
  {
    path: '',
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRouting {
}
