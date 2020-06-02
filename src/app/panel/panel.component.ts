import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, interval } from 'rxjs';

import { AppState } from '../store/reducers';
import { selectPanelState } from '../store/selectors/panel/panel.selectors';
import { closePanel } from '../store/actions/panel/panel.actions';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  count = 1;
  panel$: Observable<any>;
  counter$ = interval(1000).pipe(take(6), map(() => this.count++));

  constructor(private store: Store<AppState>) {
    this.panel$ = this.store.select(selectPanelState);
  }

  closePanel() {
    this.store.dispatch(closePanel());
  }

}
