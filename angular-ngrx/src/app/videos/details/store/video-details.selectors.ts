import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.module';

const selectVideoDetails = (state: AppState) => state.videoDetails;
const selectSettings = (state: AppState) => state.settings;

export const selectCurrentUrl = createSelector(
  selectVideoDetails,
  (state) => state?.currentVideoUrl
);

export const selectSections = createSelector(
  selectVideoDetails,
  (state) => state?.sections
);

export const selectExactSection = (index: number) =>
  createSelector(selectVideoDetails, (state) => state?.sections.at(index));

// export const selectMixed = createSelector(
//   selectVideoDetails,
//   selectSettings,
//   (videDetailsState, settingsState) =>
//     videDetailsState?.currentVideoUrl + settingsState?.default
// );
