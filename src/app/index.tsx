import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header, Empty } from '../components';
import { useResize } from '../hooks';

import {
  ADD_SONGS,
  DELETE_SONG,
  PAUSE_SONG,
  PLAY_SONG,
  RESUME_SONG,
} from '../redux';
import AudioSession from '../services/audio-session';
import { Home, NowPlaying, Playlist } from '../views';
import Menu from '../views/menu';
import './styles.css';

function App() {
  const prevPlayState = useRef({ playing: false, index: -1 });

  const [ref, size] = useResize();

  const input = useRef(null);
  const audio = useRef(null);
  const dispatch = useDispatch();

  const songs = useSelector((state: any) => state.songs);
  const playState = useSelector((state: any) => state.playState);

  const [range, setRange] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredSongs = useCallback(() => {
    if (!searchText) {
      return songs;
    } else {
      return songs.filter((s: any) =>
        s.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
  }, [searchText, songs]);

  const isSongsThere = () => !!songs.length;

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
          stop: () => pauseSong(),
        });
      }
    } catch (error) {
      dispatch(PLAY_SONG(0));
    }
  };

  const stop = () => {
    const htmlAudio: HTMLAudioElement = audioPlayer();
    htmlAudio.src = '';
  };

  const nextSong = () => {
    if (isSongsThere()) {
      dispatch(PLAY_SONG((playState.index + 1) % songs.length));
    }
  };

  const prevSong = () => {
    if (isSongsThere()) {
      const prevIndex = playState.index - 1;
      const index = prevIndex < 0 ? songs.length - 1 : prevIndex;
      dispatch(PLAY_SONG(index));
    }
  };

  const pauseSong = () => {
    if (isSongsThere()) {
      dispatch(PAUSE_SONG());
    }
  };

  const resumeSong = () => {
    if (isSongsThere()) {
      dispatch(RESUME_SONG());
    }
  };

  const handleSongEnd = () => {
    if (isSongsThere()) {
      nextSong();
    }
  };

  const deleteSong = (index: number) => {
    dispatch(PLAY_SONG(-2));
    dispatch(DELETE_SONG(index));
  };

  useEffect(() => {
    if (
      JSON.stringify(prevPlayState.current) !== JSON.stringify(playState) &&
      isSongsThere()
    ) {
      const { playing, index } = playState;
      const { index: prevIndex } = prevPlayState.current;

      if (!playing) {
        pause();
      } else if (index === -1) {
        dispatch(PLAY_SONG(0));
      } else if (index === prevIndex) {
        play();
      } else if (index === -2) {
        // stop song
        stop();
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
  // eslint-disable-next-line
  const timeDrag = (time: number) => {
    const range = audioPlayer().duration * (time / 100);
    if (!isNaN(range)) {
      audioPlayer().currentTime = range;
    }
  };

  const addSongs = () => {
    if (input.current) {
      const filePicker: HTMLInputElement = input.current!;
      filePicker.click();
    }
  };

  return (
    <div ref={ref} className="app__wrapper">
      <div className="app__container">
        <Header
          title="playlist"
          onRightIconClick={() => addSongs()}
          onLeftIconClick={() => setShowMenu(!showMenu)}
        />
        <Menu show={showMenu} onClose={() => setShowMenu(false)} />
        <Home
          showSearch={true}
          onSearch={(e: string) => setSearchText(e)}
          playlist={
            filteredSongs().length === 0 ? (
              <Empty
                message="No songs found"
                description={
                  searchText && songs.length > 0
                    ? 'To widen your search, change or remove keyword'
                    : 'When you are ready, go ahead and add few songs'
                }
              />
            ) : (
              <Playlist
                songs={songs}
                playState={playState}
                filteredSongs={filteredSongs()}
                onDelete={(index: number) => deleteSong(index)}
                onClick={(index: number) =>
                  index === playState.index
                    ? playState.playing
                      ? pauseSong()
                      : resumeSong()
                    : dispatch(PLAY_SONG(index))
                }
              />
            )
          }
        />

        {/* <Slider
          value={range}
          onTouch={() => pauseSong()}
          onTouchEnd={() => resumeSong()}
          onChange={(v: number) => timeDrag(v)}
        /> */}
        {/* <Visualizer
          width={size.width}
          audio={audioPlayer()}
          onError={() => nextSong()}
          playing={playState.playing}
          className="app__visualizer"
        /> */}
        <div className="app__content">
          <input
            hidden
            multiple
            type="file"
            ref={input}
            accept="audio/mp3"
            onChange={e => dispatch(ADD_SONGS(e.target.files))}
          />
          <audio
            hidden
            controls
            ref={audio}
            onEnded={() => handleSongEnd()}
            onTimeUpdate={() => updateTime()}
          ></audio>
        </div>
        <NowPlaying
          percent={range}
          width={size.width}
          open={playState.index > -1}
          playing={playState.playing}
          song={songs[playState.index]}
          onPlay={() => resumeSong()}
          onPause={() => pauseSong()}
        />
      </div>
    </div>
  );
}

export default App;
