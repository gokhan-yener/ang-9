import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterRouting} from './register.routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterRouting,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
  ]
})
export class RegisterModule {
}
