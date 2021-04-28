import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { SectionEpisodeDetail } from '../../components/Sections/SectionEpisodeDetail';

import { EpisodesService } from '../../services/episodesServices';

const Episode = ({ episode }) => {
  return (
    <>
      <Head>
        <title>Home | {episode.title}</title>
      </Head>
    <SectionEpisodeDetail episode={episode} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { episodes } = await EpisodesService.get(2);

  const paths = episodes.map(episode => {
    return {
      params: {
        slug: episode.id,
      }
    }
  });

  return {
    paths,
    fallback: 'blocking'
  }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const episode = await EpisodesService.getBySlug(slug);

  return { 
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, 
  }
}

export default Episode;