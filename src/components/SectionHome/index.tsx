import Image from 'next/image';

import s from './styles.module.scss';

import { SectionHomeProps } from './interface';

export const SectionHome = ({ episodes, latestEpisodes }: SectionHomeProps) => {

  return (
    <div className={s.sectionHome}>
      <section className={s.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes && latestEpisodes.map(episode => (
            <li key={episode.id}>
              <Image
                width={192} 
                height={192} 
                src={episode.thumbnail} 
                alt={episode.title}
                objectFit={'cover'}
              />

              <div className={s.episodeDetail}>
                <a href="">{episode.title}</a>
                <p>{episode.members}</p>
                <span>{episode.published_at}</span>
                <span className={s.separator}>•</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button type="button">
                <img src="/icons/play-green.svg" alt="tocar episódio"/>
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={s.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </thead>
            <tbody>
              {episodes.map(episode => (
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
                    <a href="">{episode.title}</a>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.published_at}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/icons/play-green.svg" alt="Tocar episódio"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </section>
    </div>
  )
}