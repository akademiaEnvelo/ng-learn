export interface SettingsState {
  default: boolean;
}

export const settingsFeatureKey = 'settings';

export const initialSettingsState: SettingsState = {
  default: false,
};
