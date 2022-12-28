import { createReducer, on } from '@ngrx/store';
import { VideoDetailsActions } from './video-details.actions';
import { initialVideoDetailState } from './video-details.state';

export const videoDetailsReducer = createReducer(
  initialVideoDetailState,
  on(VideoDetailsActions.setCurrentVideoUrl, (state, { videoUrl }) => ({
    ...state,
    currentVideoUrl: videoUrl,
  })),
  on(VideoDetailsActions.addVideoSection, (state, action) => {
    return {
      ...state,
      sections: [...state.sections, action.section],
    };
  }),
  on(VideoDetailsActions.addVideoSections, (state, { sections }) => ({
    ...state,
    sections: [...state.sections, ...sections],
  })),
  on(
    VideoDetailsActions.updateVideoSectionName,
    (state, { sectionId, updatedName }) => {
      const updatedSections = state.sections.map((section) =>
        section.id === sectionId ? { ...section, name: updatedName } : section
      );

      return {
        ...state,
        sections: updatedSections,
      };
    }
  ),
  on(VideoDetailsActions.removeVideoSection, (state, { sectionId }) => {
    const filteredSections = state.sections.filter(
      (section) => section.id !== sectionId
    );

    return {
      ...state,
      sections: filteredSections,
    };
  })
);
