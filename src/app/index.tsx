import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_SONGS, PAUSE_SONG, PLAY_SONG, RESUME_SONG } from '../redux';
// import { addNewSongToSession } from '../services/audio-session';
import './styles.css';

function App() {
  const prevPlayState = useRef({ playing: false, index: -1 });

  const audio = useRef(null);
  const dispatch = useDispatch();
  const songs = useSelector((state: any) => state.songs);
  const playState = useSelector((state: any) => state.playState);

  // const [songIndex, setSongIndex] = useState(-1);
  const audioPlayer = (): HTMLAudioElement => audio.current!;

  const playSong = async () => {
    if (audio.current) {
      await audioPlayer().play();
    }
  };

  const pauseSong = () => {
    if (audio.current) {
      audioPlayer().pause();
    }
  };

  const startSong = async (index: number) => {
    if (audio.current) {
      const htmlAudio: HTMLAudioElement = audioPlayer();
      htmlAudio.src = URL.createObjectURL(songs[index]);

      await htmlAudio.play();

      console.log(htmlAudio.volume);
    }
  };

  const handleSongEnd = () => {
    dispatch(PLAY_SONG((playState.index + 1) % songs.length));
  };

  useEffect(() => {
    if (JSON.stringify(prevPlayState.current) !== JSON.stringify(playState)) {
      const { playing, index } = playState;
      const { index: prevIndex } = prevPlayState.current;

      if (!playing) {
        pauseSong();
      } else if (index === -1) {
        startSong(0);
      } else if (index === prevIndex) {
        playSong();
      } else {
        startSong(index);
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
      <div className="button" onClick={() => dispatch(PAUSE_SONG())}>
        Pause
      </div>
      <div className="button" onClick={() => dispatch(RESUME_SONG())}>
        Play
      </div>
    </div>
  );
}

export default App;
