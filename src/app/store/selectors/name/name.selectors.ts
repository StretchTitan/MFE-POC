import { createSelector } from '@ngrx/store';

import { AppState } from '../../reducers';

export const selectNameState = (state: AppState) => state.name;

export const selectName = createSelector(
  selectNameState,
  ({ firstName, lastName }) => ({ firstName, lastName })
);
