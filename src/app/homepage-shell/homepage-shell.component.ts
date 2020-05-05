import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import * as nameActions from '../store/actions/name/name.actions';

@Component({
  selector: 'app-homepage-shell',
  templateUrl: './homepage-shell.component.html',
  styleUrls: ['./homepage-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageShellComponent {
  appState;

  constructor(private store: Store<AppState>) {
    this.appState = this.store.select(selectName);
  }

  handleMessage(e) {
    this.store.dispatch(nameActions[e.detail.action]());
  }
}
