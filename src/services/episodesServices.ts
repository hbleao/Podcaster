import { api } from './api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

export const EpisodesService = {
  get: async () => {
    const { data } = await api.get('/api/episodes', {
      params: {
        _limit: 12,
        _sort: 'published_at',
        _order: 'desc'
      }
    });

    const formatEpisodes = data.map(episodes => {
      return { 
        id: episodes.id,
        title: episodes.title,
        members: episodes.members,
        published_at: format(parseISO(episodes.published_at), 'd MMM yy', {
          locale: ptBR
        }),
        thumbnail: episodes.thumbnail,
        description: episodes.description,
        duration: Number(episodes.file.duration),
        durationAsString: convertDurationToTimeString(Number(episodes.file.duration)),
        url: episodes.file.url
      }
    })

    const latestEpisodes = formatEpisodes.slice(0, 2);
    
    return {
      allEpisodes: formatEpisodes, 
      latestEpisodes
    };
  }
}