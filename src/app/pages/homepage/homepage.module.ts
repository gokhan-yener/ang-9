import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import {HomepageRouting} from './homepage.routing.module';



@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRouting
  ]
})
export class HomepageModule { }
