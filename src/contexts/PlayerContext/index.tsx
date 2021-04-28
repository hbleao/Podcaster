import { createContext, useContext, useState } from 'react';

import { PlayerContextData, PlayerProviderProps, Episode } from './interface';

const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [episode, setEpisode] = useState({
    hasNextEpisode: false,
    hasPrevEpisode: false
  });

  const updateEpisodeStatus = () => {
    setEpisode({
      hasNextEpisode: isShuffling || (currentEpisodeIndex + 1) < episodeList.length,
      hasPrevEpisode: currentEpisodeIndex > 0
    })
  };

  const play = (episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
    updateEpisodeStatus();
  };

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
    updateEpisodeStatus();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const setIsPlayingState = (state: boolean) => {
    setIsPlaying(state);
    updateEpisodeStatus();
  };

  const playNextEpisode = () => {
    updateEpisodeStatus();
    if(isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if(episode.hasNextEpisode) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const playPrevEpisode = () => {
    updateEpisodeStatus();
    if(episode.hasPrevEpisode) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  const clearPlayerState = () => {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      isLooping,
      hasNextEpisode: episode.hasNextEpisode,
      hasPrevEpisode: episode.hasPrevEpisode,
      isShuffling,
      play,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      setIsPlayingState,
      playList,
      playNextEpisode,
      playPrevEpisode,
      clearPlayerState
    }}>
      {children}
    </PlayerContext.Provider>
  )
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('PlayerContext is required.')
  }

  const {  
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasNextEpisode,
    hasPrevEpisode,
    play,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setIsPlayingState,
    playList,
    playNextEpisode,
    playPrevEpisode,
    clearPlayerState
  } = context;

  return { 
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasNextEpisode,
    hasPrevEpisode,
    play,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setIsPlayingState,
    playList,
    playNextEpisode,
    playPrevEpisode,
    clearPlayerState
  }
}
