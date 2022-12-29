import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from './settings.actions';
import { initialSettingsState } from './settings.state';

export const settingsReducer = createReducer(
  initialSettingsState,
  on(SettingsActions.changeDefaultToTrue, (state) => ({
    ...state,
    default: true,
  })),
  on(SettingsActions.resetState, () => ({
    ...initialSettingsState,
  }))
);
