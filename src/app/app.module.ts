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

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HeaderComponent,
    SubHeaderComponent,
    HomeLayoutComponent,
    SubLayoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
