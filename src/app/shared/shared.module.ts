import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LSelect2Module} from 'ngx-select2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LSelect2Module,
    FormsModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
