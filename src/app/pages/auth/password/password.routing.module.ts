import { RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {RequestResetComponent} from './request-reset/request-reset.component';
import {ResponseResetComponent} from './response-reset/response-reset.component';

const routes = [
  {
    path: 'reset',
    component: RequestResetComponent
  },
  {
    path: 'response',
    component: ResponseResetComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule {
}
