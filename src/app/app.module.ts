import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LazyElementsModule, LAZY_ELEMENTS_REGISTRY } from '@angular-extensions/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageShellComponent } from './homepage-shell/homepage-shell.component';
import { BillingShellComponent } from './billing-shell/billing-shell.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CustomLazyRegistry } from './custom-lazy-registry';

@NgModule({
  declarations: [
    AppComponent,
    HomepageShellComponent,
    BillingShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LazyElementsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: LAZY_ELEMENTS_REGISTRY,
      useClass: CustomLazyRegistry
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
