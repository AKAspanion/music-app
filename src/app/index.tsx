import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Slider, Visualizer } from '../components';

import { ADD_SONGS, PAUSE_SONG, PLAY_SONG, RESUME_SONG } from '../redux';
import AudioSession from '../services/audio-session';
import './styles.css';

function App() {
  const prevPlayState = useRef({ playing: false, index: -1 });

  const audio = useRef(null);
  const dispatch = useDispatch();

  const songs = useSelector((state: any) => state.songs);
  const playState = useSelector((state: any) => state.playState);
  const [range, setRange] = useState<number>(0);

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
      if (audio.current && songs[index]) {
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
    dispatch(PAUSE_SONG());
  };

  const resumeSong = () => {
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
        dispatch(PLAY_SONG(0));
      } else if (index === prevIndex) {
        play();
      } else {
        start(index);
      }
    }

    prevPlayState.current = playState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playState]);

  const updateTime = () => {
    const currentTime =
      (100 * audioPlayer().currentTime) / audioPlayer().duration || 0;

    setRange(Math.round(currentTime));
  };

  const timeDrag = (time: number) => {
    const range = audioPlayer().duration * (time / 100);
    if (!isNaN(range)) {
      audioPlayer().currentTime = range;
    }
  };

  return (
    <div className="App">
      <div style={{ padding: 50, background: '#191B2D' }}>
        <Button />
      </div>
      <Slider
        value={range}
        onTouch={() => pauseSong()}
        onTouchEnd={() => resumeSong()}
        onChange={(v: number) => timeDrag(v)}
      />
      <Visualizer
        audio={audioPlayer()}
        playing={playState.playing}
        onError={() => nextSong()}
      />
      <input
        multiple
        type="file"
        accept="audio/mp3"
        onChange={e => dispatch(ADD_SONGS(e.target.files))}
      />
      <audio
        controls
        ref={audio}
        onEnded={() => handleSongEnd()}
        onTimeUpdate={() => updateTime()}
      ></audio>
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
