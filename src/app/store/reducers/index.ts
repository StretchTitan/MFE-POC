import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { nameFeatureKey, nameReducer, NameState } from './name/name.reducer';

export interface AppState {
  [nameFeatureKey]: NameState;
}

export const reducers: ActionReducerMap<AppState> = {
  [nameFeatureKey]: nameReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
