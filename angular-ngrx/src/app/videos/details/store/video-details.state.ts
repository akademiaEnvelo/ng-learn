import { VideoSection } from '../video-details.component';

export const videoDetailsFeatureKey = 'videoDetails';

export interface VideoDetailsState {
  sections: VideoSection[];
  currentVideoUrl: string;
}

export const initialVideoDetailState: VideoDetailsState = {
  currentVideoUrl: '',
  sections: [],
};
