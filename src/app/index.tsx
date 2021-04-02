import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_SONGS, PAUSE_SONG, PLAY_SONG, RESUME_SONG } from '../redux';
import AudioSession from '../services/audio-session';
import './styles.css';

function App() {
  const prevPlayState = useRef({ playing: false, index: -1 });

  const audio = useRef(null);
  const canvas = useRef(null);
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

  function visual() {
    const ca: any = canvas.current!;
    const ctx: CanvasRenderingContext2D = ca.getContext('2d');

    const atx: AudioContext = new AudioContext();
    const analyser: AnalyserNode = atx.createAnalyser();

    analyser.fftSize = 2048;

    const source = atx.createMediaElementSource(audioPlayer());

    source.connect(analyser);

    source.connect(atx.destination);

    const WIDTH = ca.width;
    const HEIGHT = ca.height;

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount; // half the FFT value
    var dataArray = new Uint8Array(bufferLength); // create an array to store the data

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const color = () => {
      var c = () => Math.random() * 255;

      return `rgb(${c()},${c()},${c()})`;
    };

    function draw() {
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above

      ctx.fillStyle = '#191B2D'; // draw wave with canvas
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.lineWidth = 2;

      ctx.beginPath();

      var sliceWidth = (WIDTH * 1.0) / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = (v * HEIGHT) / 2;

        ctx.strokeStyle = color();

        if (i % 100 === 0) {
          console.log(dataArray[i]);
        }

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(ca.width, ca.height / 2);
      ctx.stroke();
    }

    draw();
  }

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
      <canvas
        style={{ visibility: playState.playing ? 'visible' : 'hidden' }}
        ref={canvas}
        height="300"
        width="700"
      ></canvas>
      <div className="button" onClick={() => visual()}>
        play
      </div>
    </div>
  );
}

export default App;
