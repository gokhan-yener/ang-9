import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeLayoutComponent} from './layout/app-layout/home-layout/home-layout.component';
import {SubLayoutComponent} from './layout/app-layout/sub-layout/sub-layout.component';
import {BreadLayoutComponent} from './layout/app-layout/bread-layout/bread-layout.component';
import {UserGuard} from './guard/user.guard';
import {NotFoundComponent} from './pages/components/error/not-found/not-found.component';


const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule)},
    ],
  },
  {
    path: 'products', component: SubLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)},
    ],
  },
  {
    path: 'login', component: BreadLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)}
    ],
  },
  {
    path: 'register', component: BreadLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule)}
    ],
  },
  {
    path: 'password', component: BreadLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/auth/password/password.module').then(m => m.PasswordModule)}
    ],
  },
  {
    path: 'profile', component: BreadLayoutComponent, children: [
      {path: '', loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)}
    ],
    canActivate: [UserGuard]
  },
  {

    path: 'notFound',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'notFound'
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
