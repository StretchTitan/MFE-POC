import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { nameFeatureKey, nameReducer, NameState } from './name/name.reducer';
import { alertFeatureKey, alertReducer, AlertState } from './alert/alert.reducer';
import { panelFeatureKey, panelReducer, PanelState } from './panel/panel.reducer';

export interface AppState {
  [nameFeatureKey]: NameState;
  [alertFeatureKey]: AlertState;
  [panelFeatureKey]: PanelState;
}

export const reducers: ActionReducerMap<AppState> = {
  [nameFeatureKey]: nameReducer,
  [alertFeatureKey]: alertReducer,
  [panelFeatureKey]: panelReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
