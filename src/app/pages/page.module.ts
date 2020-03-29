import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './components/alert/alert.component';
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [AlertComponent, DatepickerComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [AlertComponent, DatepickerComponent]
})
export class PageModule {
}
