import { createReducer, on } from '@ngrx/store';
import { closePanel, setPanel } from '../../actions/panel/panel.actions';



export const panelFeatureKey = 'panel';

export interface PanelState {
  title: string;
  message: string;
  components: string[];
  isShown: boolean;
}

export const initialState: PanelState = {
  title: '',
  message: '',
  components: [],
  isShown: false,
};


export const panelReducer = createReducer(
  initialState,
  on(setPanel, (state, { title, message, components }) => ({ title, message, components, isShown: true })),
  on(closePanel, state => initialState),
);
