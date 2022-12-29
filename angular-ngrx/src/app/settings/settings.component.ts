import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsActions } from './store/settings.actions';

@Component({
  selector: 'app-settings',
  template: ` <p>settings works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  constructor(private store: Store) {
    this.store.dispatch(SettingsActions.changeDefaultToTrue());
  }
}
