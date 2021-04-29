declare global {
  interface Window {
    MediaMetadata: any;
    jsmediatags: any;
  }
}

const Navigator = window.navigator as any;

const isMediaSessionSupported = 'mediaSession' in navigator;

export default class AudioSession {
  public static addNewSong = async (song: any, callbacks: any) => {
    try {
      if (isMediaSessionSupported) {
        const { next, prev, play, pause } = callbacks;

        const meta = await AudioSession.getMetadata(song);

        const { title, year, artist, album } = meta.tags ?? {};

        Navigator.mediaSession.metadata = new window.MediaMetadata({
          title: title ?? song.name,
          artist: artist ?? 'Unknown',
          album: album ?? 'Unknown',
          year: year,
          artwork: [
            {
              src: 'https://dummyimage.com/96x96',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/128x128',
              sizes: '128x128',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/192x192',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/256x256',
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/384x384',
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: 'https://dummyimage.com/512x512',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        });

        Navigator.mediaSession.setActionHandler('previoustrack', prev);

        Navigator.mediaSession.setActionHandler('nexttrack', next);

        Navigator.mediaSession.setActionHandler('play', play);

        Navigator.mediaSession.setActionHandler('pause', pause);

        Navigator.mediaSession.setActionHandler('stop', pause);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  public static updatePositionState(audioEl: HTMLAudioElement) {
    Navigator.mediaSession.setPositionState({
      duration: audioEl.duration,
      position: audioEl.currentTime,
      playbackRate: audioEl.playbackRate,
    });
  }

  static getMetadata = (song: Blob) =>
    new Promise<any>(resolve => {
      window.jsmediatags.read(song, {
        onSuccess: function (tag: any) {
          resolve(tag);
        },
        onError: function (error: any) {
          console.log(error);
          resolve({});
        },
      });
    });
}
