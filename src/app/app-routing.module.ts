import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeLayoutComponent} from './layout/app-layout/home-layout/home-layout.component';
import {TestComponent} from './pages/test/test.component';


const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'homepage'},
      {path: 'homepage', loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule)},
      {path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)},
      {
        path: 'profile',
        loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
      }],
  },
  {
    path: 'test', component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
