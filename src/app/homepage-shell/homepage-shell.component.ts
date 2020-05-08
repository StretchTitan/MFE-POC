import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import * as nameActions from '../store/actions/name/name.actions';
import { of, Observable } from 'rxjs';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-homepage-shell',
  templateUrl: './homepage-shell.component.html',
  styleUrls: ['./homepage-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageShellComponent {
  nameState;
  routerState: Observable<any> = of({});

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.nameState = store.select(selectName);
    this.routerState = route.url.pipe(map(segments => `/${segments.join('/')}`  ));
  }

  handleMessage(e) {
    this.store.dispatch(nameActions[e.detail.action]());
  }
}
