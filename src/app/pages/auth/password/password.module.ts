import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {PasswordRoutingModule} from './password.routing.module';


@NgModule({
  declarations: [],
  imports: [
    PasswordRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports: [

  ]
})
export class PasswordModule {
}
