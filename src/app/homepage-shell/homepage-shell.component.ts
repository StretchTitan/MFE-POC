import { Component, OnInit } from '@angular/core';

import { AppState } from '../store/reducers';
import { selectName } from '../store/selectors/name/name.selectors';
import { Store } from '@ngrx/store';
import * as nameActions from '../store/actions/name/name.actions';
import { Event } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-homepage-shell',
  templateUrl: './homepage-shell.component.html',
  styleUrls: ['./homepage-shell.component.scss']
})
export class HomepageShellComponent implements OnInit {
  appState;
  scriptLoaded: Observable<boolean>;
  path = 'http://localhost:4201/main.js';

  constructor(private store: Store<AppState>) {
    this.appState = this.store.select(selectName);
  }

  ngOnInit() {
    // this.scriptLoaded = this.load();
  }

  // load(): Observable<boolean> {
  //   if (!document.getElementById('homepage-bundle')) {
  //     const script = document.createElement('script');
  //     script.id = 'homepage-bundle';
  //     script.src = this.path;
  //     script.onerror = () => console.error(`error loading ${this.path}`);
  //     document.body.appendChild(script);
  //   }

  //   return of(true);
  // }

  handleMessage(e) {
    console.log(e.detail);
    this.store.dispatch(nameActions[e.detail.action]());
  }
}
