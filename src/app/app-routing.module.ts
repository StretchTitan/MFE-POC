import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';

import { HomepageShellComponent } from './homepage-shell/homepage-shell.component';
import { BillingShellComponent } from './billing-shell/billing-shell.component';

export function homeMatcher(url: UrlSegment[]) {
  return url.length >= 1 && url[0].path === 'home' ? ({consumed: url}) : null;
}

export const routes: Routes = [
  {
    matcher: homeMatcher,
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
