import { VideoSection } from '../video-details.component';

export interface VideoDetailsState {
  sections: VideoSection[];
  currentVideoUrl: string;
}

export const initialVideoDetailState: VideoDetailsState = {
  currentVideoUrl: '',
  sections: [],
};
