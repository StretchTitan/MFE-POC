import { createReducer, on } from '@ngrx/store';
import { closeAlert, setAlert } from '../../actions/alert/alert.actions';



export const alertFeatureKey = 'alert';

export interface AlertState {
  title: string;
  message: string;
  isShown: boolean;
}

export const initialState: AlertState = {
  title: '',
  message: '',
  isShown: false,
};


export const alertReducer = createReducer(
  initialState,
  on(setAlert, (state, { title, message }) => ({ title, message, isShown: true })),
  on(closeAlert, state => initialState),
);
