import Image from 'next/image';
import Link from 'next/link';

import s from './styles.module.scss';

import { Container } from '../../Container';
import { TitleSection } from '../../TitleSection';

import { SectionLatestEpisodesProps } from './interface';

import { usePlayer } from '../../../contexts/PlayerContext';

export const SectionLatestEpisodes = ({ latestEpisodes, allEpisodes }: SectionLatestEpisodesProps) => {
  const { playList } = usePlayer();

  // const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <Container>
      <section className={s.latestEpisodes}>
        <TitleSection>Últimos lançamentos</TitleSection>

        <ul>
          {latestEpisodes && latestEpisodes.map((episode, i) => (
            <li key={episode.id}>
              <Image
                width={192} 
                height={192} 
                src={episode.thumbnail} 
                alt={episode.title}
                objectFit={'cover'}
              />

              <div className={s.episodeDetail}>
                <Link href={`/episodes/${episode.id}`}>
                 <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.published_at}</span>
                <span className={s.separator}>•</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button" onClick={() => playList(allEpisodes, i)}>
                <img src="/icons/play-green.svg" alt="tocar episódio"/>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}