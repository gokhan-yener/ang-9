import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopbarComponent} from './layout/partial/topbar/topbar.component';
import {SubHeaderComponent} from './layout/header/sub-header/sub-header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HomeLayoutComponent} from './layout/app-layout/home-layout/home-layout.component';
import {SubLayoutComponent} from './layout/app-layout/sub-layout/sub-layout.component';
import {HeaderComponent} from './layout/header/home/header.component';
import {ApiService} from './services/api.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SliderComponent} from './layout/partial/slider/slider.component';
import {CategoriesComponent} from './layout/partial/categories/categories.component';
import {LSelect2Module} from 'ngx-select2';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {BreadcrumbComponent} from './layout/partial/breadcrumb/breadcrumb.component';
import {BreadHeaderComponent} from './layout/header/bread-header/bread-header.component';
import {BreadLayoutComponent} from './layout/app-layout/bread-layout/bread-layout.component';
import {StoreModule} from '@ngrx/store';
import {StorageService} from './services/storage.service';
import {AuthService} from './services/auth.service';
import {AuthInterceptor} from './interceptors/AuthInterceptor';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {UserEffects} from './store/effects/user.effects';
import {RequestResetComponent} from './pages/auth/password/request-reset/request-reset.component';
import {ResponseResetComponent} from './pages/auth/password/response-reset/response-reset.component';
import {SocialComponent} from './pages/components/social/social.component';
import {NotFoundComponent} from './pages/components/error/not-found/not-found.component';
import {PageModule} from './pages/page.module';
import {NgxMaskModule} from 'ngx-mask';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    LoginComponent,
    RegisterComponent,
    BreadcrumbComponent,
    BreadHeaderComponent,
    BreadLayoutComponent,
    RequestResetComponent,
    ResponseResetComponent,
    SocialComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    StoreModule.forRoot(reducers, {}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LSelect2Module,
    NgxSpinnerModule,
    FormsModule,
    PageModule,
    NgxMaskModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    AuthService, StorageService, ApiService],
  exports: [StoreModule],
  bootstrap: [AppComponent],

})
export class AppModule {
}

