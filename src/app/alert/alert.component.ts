import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { Observable } from 'rxjs';
import { selectAlertState } from '../store/selectors/alert/alert.selectors';
import { closeAlert } from '../store/actions/alert/alert.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  alert$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.alert$ = this.store.select(selectAlertState);
  }

  closeAlert() {
    this.store.dispatch(closeAlert());
  }

}
