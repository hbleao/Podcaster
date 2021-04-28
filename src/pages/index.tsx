import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SectionLatestEpisodes } from "../components/Sections/SectionLatestEpisodes";
import { SectionEpisodeList } from "../components/Sections/SectionEpisodesList";

import { EpisodesService } from '../services/episodesServices';

const Home = ({ allEpisodes, latestEpisodes }) => {
  return (
    <>
      <Head>
        <title>Home | PodCaster</title>
      </Head>
      <SectionLatestEpisodes
        latestEpisodes={latestEpisodes}
        allEpisodes={allEpisodes}
      />
      <SectionEpisodeList 
        allEpisodes={allEpisodes}
      />
    </>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const { episodes } = await EpisodesService.get();

  const latestEpisodes = episodes.slice(0, 2);

  return {
    props: {
      allEpisodes: episodes, 
      latestEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}

export default Home;