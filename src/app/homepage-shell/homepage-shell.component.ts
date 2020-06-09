import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import * as nameActions from '../store/actions/name/name.actions';
import * as alertActions from '../store/actions/alert/alert.actions';
import * as panelActions from '../store/actions/panel/panel.actions';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-homepage-shell',
  templateUrl: './homepage-shell.component.html',
  styleUrls: ['./homepage-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageShellComponent {
  nameState$: Observable<any>;
  routerState$: Observable<any>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.nameState$ = store.select(selectName);
    this.routerState$ = route.url.pipe(map(segments => `/${segments.join('/')}`  ));
  }

  handleMessage(e) {
    let action;

    switch (e.detail.action) {
      case 'setName':
      case 'clearName':
        action = nameActions[e.detail.action];
        break;
      case 'setAlert':
        action = alertActions[e.detail.action];
        break;
      case 'setPanel':
        action = panelActions[e.detail.action];
        break;
      default:
        break;
    }

    this.store.dispatch(action(e.detail.payload));
  }
}
