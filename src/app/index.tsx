import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';

import { Header, Empty, Visualizer } from '../components';
import { useResize } from '../hooks';

import {
  ADD_SONGS,
  PLAY_SONG,
  PAUSE_SONG,
  RESUME_SONG,
  DELETE_SONG,
} from '../redux';

import AudioSession from '../services/audio-session';
import { Track, Menu, Home, NowPlaying, Playlist } from '../views';
import { setTheme } from '../utils';
import './styles.css';

function App() {
  const prevPlayState = useRef({ playing: false, index: -1 });

  const [ref, size] = useResize();

  const input = useRef(null);
  const audio = useRef(null);
  const dispatch = useDispatch();

  const songs = useSelector((state: any) => state.songs);
  const settings = useSelector((state: any) => state.settings);
  const playState = useSelector((state: any) => state.playState);

  const [range, setRange] = useState(0);
  const [view, setView] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState('');

  useMemo(() => setTheme(settings.light), [settings.light]);

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
          next: () => nextSong(true),
          prev: () => prevSong(true),
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

  const shuffleSong = () => {
    if (isSongsThere()) {
      dispatch(PLAY_SONG(Math.floor(Math.random() * songs.length)));
    }
  };

  const nextSong = (override: boolean = false) => {
    if (isSongsThere()) {
      pauseSong();

      setTimeout(() => {
        if (settings.repeat === 'one' && !override) {
          resumeSong();
        } else {
          dispatch(PLAY_SONG((playState.index + 1) % songs.length));
        }
      });
    }
  };

  const prevSong = (override: boolean = false) => {
    if (isSongsThere()) {
      pauseSong();

      setTimeout(() => {
        if (settings.repeat === 'one' && !override) {
          resumeSong();
        } else {
          const prevIndex = playState.index - 1;
          const index = prevIndex < 0 ? songs.length - 1 : prevIndex;
          dispatch(PLAY_SONG(index));
        }
      });
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

    setTimeout(() => {
      dispatch(DELETE_SONG(index));
    }, 100);
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

  const visualize = (app: boolean) => {
    return (
      <Visualizer
        app={app}
        width={size.width}
        audio={audioPlayer()}
        onError={() => nextSong()}
        playing={playState.playing}
        short={app ? undefined : 10}
        className={app ? 'app__visualizer' : ''}
      />
    );
  };

  return (
    <div ref={ref} className="app__wrapper">
      <div className="app__container">
        {view === 'home' ? (
          <Header
            title="playlist"
            onRightIconClick={() => addSongs()}
            onLeftIconClick={() => setShowMenu(!showMenu)}
          />
        ) : (
          <Header
            title="Track"
            rightIcon={null}
            leftIcon={
              <div style={{ transform: 'translateX(-2px)' }}>
                <FaChevronLeft size={24} />
              </div>
            }
            onLeftIconClick={() => setView('home')}
          />
        )}
        <Menu show={showMenu} onClose={() => setShowMenu(false)} />
        {view === 'home' ? (
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
                  grid={settings.grid}
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
        ) : (
          <Track
            range={range}
            playing={playState.playing}
            onNext={() => nextSong(true)}
            onPrev={() => prevSong(true)}
            onPlay={() => resumeSong()}
            onPause={() => pauseSong()}
            onShuffle={() => shuffleSong()}
            song={songs[playState.index]}
            onChange={(v: number) => timeDrag(v)}
            visualizer={visualize(true)}
          />
        )}

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
          playing={playState.playing}
          song={songs[playState.index]}
          onPlay={() => resumeSong()}
          onPause={() => pauseSong()}
          onClick={() => setView('track')}
          open={view === 'home' && playState.index > -1}
          visualizer={visualize(false)}
        />
      </div>
    </div>
  );
}

export default App;
