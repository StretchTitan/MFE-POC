import { createReducer, on } from '@ngrx/store';

import { setName, clearName } from '../../actions/name/name.actions';


export const nameFeatureKey = 'name';

export interface NameState {
  firstName: string;
  lastName: string;
}

export const initialState: NameState = {
  firstName: '',
  lastName: ''
};


export const nameReducer = createReducer(
  initialState,
  on(setName, (state, { firstName, lastName }) => ({ firstName, lastName })),
  on(clearName, state => initialState),
);

