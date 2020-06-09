import { createAction, props } from '@ngrx/store';

export const setName = createAction(
  'Set Name',
  props<{ firstName: string; lastName: string }>()
);

export const clearName = createAction('Clear Name');
