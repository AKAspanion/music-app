import { useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

type VisualizerProps = {
  audio: HTMLAudioElement;
  onError?: Function;
  className?: string;
  playing: boolean;
  width?: number;
  short?: number;
  app?: boolean;
};

let atx: AudioContext | undefined;
let source: MediaElementAudioSourceNode | undefined;
let animationFrameRequestId: number | undefined;
const Visualizer = ({
  audio,
  playing,
  onError,
  short = 2,
  width = 400,
  app = false,
  className = '',
}: VisualizerProps) => {
  const { view } = useSelector((state: any) => state.app);
  const settings = useSelector((state: any) => state.settings);

  const canvasRef = useRef(null);

  const canvasWidth = () => (width > 700 ? 700 : width);

  const canvasHeight = () => 300;

  const visualize = (fillValue: string) => {
    try {
      const ca: any = canvasRef.current!;
      const ctx: CanvasRenderingContext2D = ca.getContext('2d');

      if (atx === undefined) {
        atx = new AudioContext();
      }
      const analyser: AnalyserNode = atx.createAnalyser();

      analyser.fftSize = 2048;

      if (source === undefined) {
        source = atx.createMediaElementSource(audio);
      }

      source.connect(analyser);

      source.connect(atx.destination);

      const WIDTH = 700;
      const HEIGHT = 300;

      analyser.fftSize = 2048;
      var bufferLength = analyser.frequencyBinCount; // half the FFT value
      var dataArray = new Uint8Array(bufferLength); // create an array to store the data

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      const color = () => {
        var c = () => Math.random() * 255;

        return `rgb(${c()},${c()},${c()})`;
      };

      const loop = () => {
        animationFrameRequestId = undefined;

        start();
        draw();
      };

      const start = () => {
        if (!animationFrameRequestId) {
          animationFrameRequestId = requestAnimationFrame(loop);
        }
      };

      const draw = () => {
        analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above

        ctx.fillStyle = fillValue ?? '#36395E'; // draw wave with canvas
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.lineWidth = 2;

        ctx.beginPath();

        var sliceWidth = (WIDTH * 1.0) / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
          var v = dataArray[i] / 128.0;
          var y = (v * HEIGHT) / short;

          ctx.strokeStyle = color();

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(WIDTH, HEIGHT / 2);
        ctx.stroke();
      };

      start();
    } catch (error) {
      onError && onError(error);
    }
  };

  useLayoutEffect(() => {
    const stop = () => {
      if (animationFrameRequestId) {
        cancelAnimationFrame(animationFrameRequestId);
        animationFrameRequestId = undefined;
      }
    };

    if (audio) {
      const appColor = settings.light ? '#EDEEF4' : '#191C2D';
      const normalColor = settings.light ? '#BBBED9' : '#36395E';

      if (playing) {
        visualize(app ? appColor : normalColor);
      } else {
        stop();
      }
    }

    return () => stop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio, playing, settings.light, app, view]);

  return (
    <canvas
      style={{ visibility: playing ? 'visible' : 'hidden' }}
      height={canvasHeight()}
      width={canvasWidth()}
      className={className}
      ref={canvasRef}
    ></canvas>
  );
};
export default Visualizer;
