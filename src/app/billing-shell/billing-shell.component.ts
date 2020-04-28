import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import * as nameActions from '../store/actions/name/name.actions';

@Component({
  selector: 'app-billing-shell',
  templateUrl: './billing-shell.component.html',
  styleUrls: ['./billing-shell.component.scss']
})
export class BillingShellComponent implements OnInit {
  appState;
  path = 'http://localhost:4202/main.js';

  constructor(private store: Store<AppState>) {
    this.appState = this.store.select(selectName);
  }

  ngOnInit() {
    // this.load();
  }

  // load(): void {
  //   if (!document.getElementById('billing-bundle')) {
  //     const script = document.createElement('script');
  //     script.id = 'billing-bundle';
  //     script.src = this.path;
  //     script.onerror = () => console.error(`error loading ${this.path}`);
  //     document.body.appendChild(script);
  //   }

  //   this.appState = this.store.select(selectName);
  // }

  handleMessage({ detail }) {
    console.log(detail);
    this.store.dispatch(nameActions[detail.action]());
  }

}
