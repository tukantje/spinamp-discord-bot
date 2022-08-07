import { fetchTrackById, fetchAllTracks, ITrack } from '@spinamp/spinamp-sdk';

async function fetchTrack(id: string): Promise<ITrack | null> {
  const track = await fetchTrackById(id);
  if (!track) {
    return null;
  }

  return track;
}

async function fetchTracks(queryText: string): Promise<ITrack | null> {
  const tracks = await fetchAllTracks({ filter: { title: { includesInsensitive: queryText } } });

  if (!tracks || tracks.totalCount <= 0) {
    return null;
  }

  return tracks.items[0];
}

function query() {}

export const SPINAMP = 'SpinAmp';

export const spinAmpExtractor = {
  version: '1.0.0',
  important: true,
  validate: (query: string) => true,
  getInfo: async (query: string) => {
    const track = await fetchTracks(query);

    if (!track) {
      throw new Error('No track found.');
    }

    return {
      playlist: null as any,
      info: [
        {
          title: track.title,
          // thumbnail: track.lossyArtworkUrl,
          engine: track.lossyAudioUrl
          // author: track.artist.name,
          // description: track.description,
          // url: track.lossyAudioUrl
        }
      ]
    };
  }
};
