import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import s from './styles.module.scss';

import { usePlayer } from '../../contexts/PlayerContext';

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    isLooping,
    isShuffling,
    hasNextEpisode,
    hasPrevEpisode,
    toggleLoop,
    togglePlay,
    toggleShuffle,
    setIsPlayingState,
    playNextEpisode,
    playPrevEpisode,
    clearPlayerState
  } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  };

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  };

  const handleEpisodeEnded = () => {
    if (hasNextEpisode) {
      playNextEpisode();
    } else {
      clearPlayerState();
    }
  };

  useEffect(() => {
    if(!audioRef.current) return;

    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <img src="/icons/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={s.currentEpisode}>
          <Image 
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit='cover'
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
            <div className={s.emptyPlayer}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>
      )}

      <footer className={`${s.footer} ${!episode && s.empty}`}>
        <div className={s.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={s.slider}>
           {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361'}}
                railStyle={{ backgroundColor: '#9f75ff'}}
                handleStyle={{ color: '#04d361'}}
             />
           ) : (
              <div className={s.emptySlider} />
           )}
          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio 
            src={episode.url}
            autoPlay
            loop={isLooping}
            ref={audioRef}
            onPlay={() => setIsPlayingState(true)}
            onPause={() => setIsPlayingState(false)}
            onEnded={handleEpisodeEnded}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <div className={s.buttons}>
          <button 
            className={isShuffling ? s.isActive : ''}
            type="button" 
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
          >
            <img src="/icons/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button  
            type="button"
            disabled={!episode || !hasPrevEpisode}
            onClick={playPrevEpisode}
          >
            <img src="/icons/play-previous.svg" alt="Tocar anterior"/>
          </button>
          {isPlaying ? (
            <button 
              className={s.playButton} 
              type="button" 
              disabled={!episode}
              onClick={togglePlay} 
            >
              <img src="/icons/pause.svg" alt="Tocar"/>
            </button>
          ) : (
            <button
              className={s.playButton}
              type="button"
              disabled={!episode}
              onClick={togglePlay}  
            >
              <img src="/icons/play.svg" alt="Tocar"/>
            </button>
          )}
          <button 
            type="button"
            disabled={!episode || !hasNextEpisode}
            onClick={playNextEpisode}
          > 
            <img src="/icons/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button
            className={isLooping ? s.isActive : ''}
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
          >
            <img src="/icons/repeat.svg" alt="Tocar novamente"/>
          </button>
        </div>
      </footer>
    </div>
  )
};