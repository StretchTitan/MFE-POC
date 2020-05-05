import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import * as nameActions from '../store/actions/name/name.actions';

@Component({
  selector: 'app-billing-shell',
  templateUrl: './billing-shell.component.html',
  styleUrls: ['./billing-shell.component.scss']
})
export class BillingShellComponent {
  appState;

  constructor(private store: Store<AppState>) {
    this.appState = this.store.select(selectName);
  }

  handleMessage({ detail }) {
    this.store.dispatch(nameActions[detail.action]());
  }
}
