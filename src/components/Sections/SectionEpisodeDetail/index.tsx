import Image from 'next/image';
import Link from 'next/link';

import s from './styles.module.scss';

import { TitleSection } from '../../TitleSection';

import { usePlayer } from '../../../contexts/PlayerContext';

import { SectionEpisodeDetailProps } from './interface';

export const SectionEpisodeDetail = ({ episode }: SectionEpisodeDetailProps) => {
  const { play } = usePlayer();

  return (
    <section className={s.episode}>
      <div className={s.thumbnailContainer}>
        <Link href="/">
          <button className={s.left}>
            <img src="/icons/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image 
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button className={s.right} onClick={() => play(episode)}>
          <img src="/icons/play.svg" alt="Tocar episódio"/>
        </button>
      </div>

      <header className={s.header}>
        <TitleSection>{episode.title}</TitleSection>
        <span className={s.members}>{episode.members}</span>
        <span className={s.separator}>•</span>
        <span>{episode.published_at}</span>
        <span className={s.separator}>•</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div 
        className={s.description} 
        dangerouslySetInnerHTML={{ __html: episode.description }} 
      />
    </section>
  )
};