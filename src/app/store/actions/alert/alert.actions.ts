import { createAction, props } from '@ngrx/store';

export const setAlert = createAction(
  'Set Alert',
  props<{ title: string, message: string }>()
);

export const closeAlert = createAction('Close Alert');
