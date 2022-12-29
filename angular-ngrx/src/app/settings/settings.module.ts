import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from './store/settings.reducer';
import { settingsFeatureKey } from './store/settings.state';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent,
      },
    ]),
    StoreModule.forFeature(settingsFeatureKey, settingsReducer),
  ],
})
export default class SettingsModule {}
