import { fetchTrackById, fetchAllTracks } from '@spinamp/spinamp-sdk';
import { Readable } from 'stream';

function fetchTrack(id: string): Promise<Readable> {
  return new Promise(async (resolve) => {
    const track = await fetchTrackById(id);
    if (!track) return null;

    return track;
  });
}

function query() {}

export const SPINAMP = 'SpinAmp';

export const spinAmpExtractor = {
  version: '1.0.0',
  important: true,
  validate: (query: string) => true,
  getInfo: async (query: string) => {
    return {
      playlist: null as any,
      info: [
        {
          title: 'test',
          // duration: data.duration * 1000,
          // thumbnail: data.thumbnail,
          engine:
            'https://d2i9ybouka0ieh.cloudfront.net/audio-transcoded/f7f1af35-6afa-4595-ab8a-9442f2be9d4d/AUDIO_TRANSCODED/7191214-7477077-02%252520Dot_FeverDream_BiestaM2_2444%252520(1).m4a'
          // views: 0,
          // author: data.author.name,
          // description: '',
          // url: 'https://d2i9ybouka0ieh.cloudfront.net/audio-transcoded/f7f1af35-6afa-4595-ab8a-9442f2be9d4d/AUDIO_TRANSCODED/7191214-7477077-02%252520Dot_FeverDream_BiestaM2_2444%252520(1).m4a'
        }
      ]
    };
  }
};
