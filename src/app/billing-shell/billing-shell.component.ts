import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import * as nameActions from '../store/actions/name/name.actions';
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
    this.store.dispatch(nameActions[detail.action]());
  }
}
