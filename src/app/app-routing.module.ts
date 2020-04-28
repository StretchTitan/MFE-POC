import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageShellComponent } from './homepage-shell/homepage-shell.component';
import { BillingShellComponent } from './billing-shell/billing-shell.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomepageShellComponent,
  },
  {
    path: 'billing',
    component: BillingShellComponent,
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
