import { createActionGroup, emptyProps } from '@ngrx/store';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    'Change default to true': emptyProps(),
    'Reset state': emptyProps(),
  },
});
