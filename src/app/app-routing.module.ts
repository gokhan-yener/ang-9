import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeLayoutComponent} from './layout/app-layout/home-layout/home-layout.component';
import {SubLayoutComponent} from './layout/app-layout/sub-layout/sub-layout.component';
import {BreadLayoutComponent} from './layout/app-layout/bread-layout/bread-layout.component';


const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule)},
      {
        path: 'profile',
        loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
      }],
  },
  {
    path: 'products', component: SubLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)},
    ],
  },
  {
    path: 'login', component: BreadLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)}
    ],
  },
  {
    path: 'register', component: BreadLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
