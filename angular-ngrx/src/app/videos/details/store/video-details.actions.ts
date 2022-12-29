import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { VideoSection } from '../video-details.component';

export const VideoDetailsActions = createActionGroup({
  source: 'Video Details',
  events: {
    'set current video url': props<{ videoUrl: string }>(),
    'add video section': props<{ section: VideoSection }>(),
    'add video sections': props<{ sections: VideoSection[] }>(),
    'update video section name': props<{
      updatedName: string;
      sectionId: string;
    }>(),
    'remove video section': props<{ sectionId: string }>(),
  },
});

export const VideoDetailsAPIActions = createActionGroup({
  source: 'Video Details API',
  events: {
    ['remove video section success']: props<{ sectionId: string }>(),
    ['remove video section failure']: emptyProps(),
  },
});

// export const VIDEO_DETAILS_ACTIONS;
