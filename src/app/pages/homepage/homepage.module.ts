import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import {HomepageRouting} from './homepage.routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ProductItemComponent } from './product-item/product-item.component';


@NgModule({
  declarations: [HomepageComponent, ProductItemComponent ],
  imports: [
    CommonModule,
    HomepageRouting,
    SharedModule
  ]
})
export class HomepageModule { }
