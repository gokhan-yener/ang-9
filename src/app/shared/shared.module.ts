import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LSelect2Module} from 'ngx-select2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LSelect2Module,
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    DropzoneModule,
    SweetAlert2Module,
    NgbModule
  ],
})
export class SharedModule {
}
