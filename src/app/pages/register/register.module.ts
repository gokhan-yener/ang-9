import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterRouting} from './register.routing.module';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterRouting,
    SharedModule
  ]
})
export class RegisterModule { }
