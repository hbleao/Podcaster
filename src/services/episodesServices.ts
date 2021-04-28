import { api } from './api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

export const EpisodesService = {
  get: async (limit = 12) => {
    const { data } = await api.get('/episodes', {
      params: {
        _limit: limit,
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
    
    return {
      episodes: formatEpisodes,
    };
  },
  getBySlug: async (slug) => {
    const { data } = await api.get(`/episodes/${slug}`);

    const episode = {
      id: data.id,
      title: data.title,
      members: data.members,
      published_at: format(parseISO(data.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      thumbnail: data.thumbnail,
      description: data.description,
      duration: Number(data.file.duration),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      url: data.file.url
    }
    return episode;
  },
}