import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageShellComponent } from './homepage-shell/homepage-shell.component';
import { BillingShellComponent } from './billing-shell/billing-shell.component';
import { MfeFileResolver } from './mfe-file.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomepageShellComponent,
    resolve: {
      bundle: MfeFileResolver
    }
  },
  {
    path: 'billing',
    component: BillingShellComponent,
    resolve: {
      bundle: MfeFileResolver
    }
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
