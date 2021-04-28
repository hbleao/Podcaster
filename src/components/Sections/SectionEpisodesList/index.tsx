import Image from 'next/image';
import Link from 'next/link';

import s from './styles.module.scss';

import { Container } from '../../Container';
import { TitleSection } from '../../TitleSection';

import { SectionEpisodeListProps } from './interface';

import { usePlayer } from '../../../contexts/PlayerContext';

export const SectionEpisodeList = ({ allEpisodes }: SectionEpisodeListProps) => {
  const { playList } = usePlayer();

  return (
    <Container>
      <section className={s.container}>
        <TitleSection>Todos episódios</TitleSection>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes && allEpisodes.map((episode, i) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120} 
                    height={120} 
                    src={episode.thumbnail} 
                    alt={episode.title}
                    objectFit={'cover'}
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.published_at}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button type="button" onClick={() => playList(allEpisodes, i)}>
                    <img src="/icons/play-green.svg" alt="Tocar episódio"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Container>
  )
}