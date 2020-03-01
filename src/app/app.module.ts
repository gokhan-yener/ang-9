import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TopbarComponent} from './layout/partial/topbar/topbar.component';
import {SubHeaderComponent} from './layout/header/sub-header/sub-header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HomeLayoutComponent} from './layout/app-layout/home-layout/home-layout.component';
import {SubLayoutComponent} from './layout/app-layout/sub-layout/sub-layout.component';
import {HeaderComponent} from './layout/header/home/header.component';
import {ApiService} from './services/api.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SliderComponent } from './layout/partial/slider/slider.component';
import { CategoriesComponent } from './layout/partial/categories/categories.component';
import { LSelect2Module } from 'ngx-select2';
import {FormsModule} from '@angular/forms';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HeaderComponent,
    SubHeaderComponent,
    HomeLayoutComponent,
    SubLayoutComponent,
    FooterComponent,
    SliderComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LSelect2Module,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

