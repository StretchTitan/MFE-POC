import { createAction, props } from '@ngrx/store';

export const setPanel = createAction(
  'Set Panel',
  props<{ title: string, message: string, components: string[] }>()
);

export const closePanel = createAction('Close Panel');
