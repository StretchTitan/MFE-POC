import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import * as nameActions from '../store/actions/name/name.actions';
import * as alertActions from '../store/actions/alert/alert.actions';
import * as panelActions from '../store/actions/panel/panel.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-billing-shell',
  templateUrl: './billing-shell.component.html',
  styleUrls: ['./billing-shell.component.scss']
})
export class BillingShellComponent {
  nameState$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.nameState$ = this.store.select(selectName);
  }

  handleMessage({ detail }) {
    let action;

    switch (detail.action) {
      case 'setName':
      case 'clearName':
        action = nameActions[detail.action];
        break;
      case 'setAlert':
        action = alertActions[detail.action];
        break;
      case 'setPanel':
        action = panelActions[detail.action];
        break;
      default:
        break;
    }

    this.store.dispatch(action(detail.payload));
  }
}
