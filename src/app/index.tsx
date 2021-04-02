import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_SONGS, PAUSE_SONG, PLAY_SONG, RESUME_SONG } from '../redux';
import AudioSession from '../services/audio-session';
import './styles.css';

function App() {
  const prevPlayState = useRef({ playing: false, index: -1 });

  const audio = useRef(null);
  const dispatch = useDispatch();

  const songs = useSelector((state: any) => state.songs);
  const playState = useSelector((state: any) => state.playState);

  const audioPlayer = (): HTMLAudioElement => audio.current!;

  const play = async () => {
    if (audio.current) {
      try {
        await audioPlayer().play();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pause = () => {
    if (audio.current) {
      audioPlayer().pause();
    }
  };

  const start = async (index: number) => {
    try {
      if (audio.current) {
        const htmlAudio: HTMLAudioElement = audioPlayer();
        htmlAudio.src = URL.createObjectURL(songs[index]);

        await htmlAudio.play();

        AudioSession.addNewSong(songs[index], {
          next: () => nextSong(),
          prev: () => prevSong(),
          play: () => resumeSong(),
          pause: () => pauseSong(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nextSong = () => {
    dispatch(PLAY_SONG((playState.index + 1) % songs.length));
  };

  const prevSong = () => {
    const prevIndex = playState.index - 1;
    const index = prevIndex < 0 ? songs.length - 1 : prevIndex;
    dispatch(PLAY_SONG(index));
  };

  const pauseSong = () => {
    AudioSession.updatePositionState(audioPlayer());
    dispatch(PAUSE_SONG());
  };

  const resumeSong = () => {
    AudioSession.updatePositionState(audioPlayer());
    dispatch(RESUME_SONG());
  };

  const handleSongEnd = () => {
    nextSong();
  };

  useEffect(() => {
    if (JSON.stringify(prevPlayState.current) !== JSON.stringify(playState)) {
      const { playing, index } = playState;
      const { index: prevIndex } = prevPlayState.current;

      if (!playing) {
        pause();
      } else if (index === -1) {
        start(0);
      } else if (index === prevIndex) {
        play();
      } else {
        start(index);
      }
    }

    prevPlayState.current = playState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playState]);

  return (
    <div className="App">
      <input
        multiple
        type="file"
        accept="audio/mp3"
        onChange={e => dispatch(ADD_SONGS(e.target.files))}
      />
      <audio controls ref={audio} onEnded={() => handleSongEnd()}></audio>
      {songs.map(({ name }: any, index: number) => (
        <div
          key={index}
          className="song-list-item"
          onClick={() => dispatch(PLAY_SONG(index))}
        >
          {name}
        </div>
      ))}
      <div className="button" onClick={() => pauseSong()}>
        Pause
      </div>
      <div className="button" onClick={() => resumeSong()}>
        Play
      </div>
    </div>
  );
}

export default App;
