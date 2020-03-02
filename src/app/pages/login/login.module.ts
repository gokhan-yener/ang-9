import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRouting} from './login.routing.module';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRouting,
    SharedModule
  ]
})
export class LoginModule { }
