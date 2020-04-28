import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { setName } from './store/actions/name/name.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nameForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private store: Store<AppState>) {}

  submitForm() {
    console.log(this.nameForm.value);
    this.store.dispatch(setName(this.nameForm.value));
  }
}
