import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { setName } from './store/actions/name/name.actions';
import { selectName } from './store/selectors/name/name.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nameForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  setName;

  constructor(private store: Store<AppState>) {
    this.setName = this.store.select(selectName).pipe(map(name => `Set Name: ${name.firstName} ${name.lastName}`));
  }

  submitForm() {
    this.store.dispatch(setName(this.nameForm.value));
  }
}
