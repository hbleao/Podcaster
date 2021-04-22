import { GetStaticProps } from 'next';
import { SectionHome } from "../components/SectionHome";

import { EpisodesService } from '../services/episodesServices';

const Home = ({ episodes }) => {
  return (
    <SectionHome 
      episodes={episodes.allEpisodes} 
      latestEpisodes={episodes.latestEpisodes} 
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const episodes = await EpisodesService.get();

  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8
  }
}

export default Home;