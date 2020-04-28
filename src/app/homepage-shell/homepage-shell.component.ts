import { Component, OnInit } from '@angular/core';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import { Store } from '@ngrx/store';
import * as nameActions from '../store/actions/name/name.actions';

@Component({
  selector: 'app-homepage-shell',
  templateUrl: './homepage-shell.component.html',
  styleUrls: ['./homepage-shell.component.scss']
})
export class HomepageShellComponent implements OnInit {
  appState;

  constructor(private store: Store<AppState>) {
    this.appState = this.store.select(selectName);
  }

  ngOnInit(): void {
  }

  handleMessage({ detail }) {
    console.log(detail);
    this.store.dispatch(nameActions[detail.action]());
  }
}
