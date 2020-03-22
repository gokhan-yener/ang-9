import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import { LSelect2Module } from 'ngx-select2';


@NgModule({
  imports: [
    CommonModule,
    LSelect2Module
  ],
  exports: [
    TranslateModule,
  ]
})
export class SharedModule { }
