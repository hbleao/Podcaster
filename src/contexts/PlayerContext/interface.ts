import { ReactNode } from 'react';

export type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

export type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNextEpisode: boolean;
  hasPrevEpisode: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setIsPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playNextEpisode: () => void;
  playPrevEpisode: () => void;
  clearPlayerState: () => void;
};

export type PlayerProviderProps = {
  children?: ReactNode;
};
