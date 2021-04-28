export type Episode = {
  id: string;
  title: string;
  description: string;
  members: string;
  published_at: string;
  thumbnail: string;
  url: string;
  duration: number;
  durationAsString: string;
}

export type SectionLatestEpisodesProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}