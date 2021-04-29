import { useRef, useLayoutEffect, useState } from 'react';

type VisualizerProps = {
  audio: HTMLAudioElement;
  onError?: Function;
  className?: string;
  playing: boolean;
  width?: number;
  short?: number;
  fill?: string;
};

let atx: AudioContext | undefined;
let source: MediaElementAudioSourceNode | undefined;
const Visualizer = ({
  audio,
  playing,
  onError,
  short = 2,
  width = 400,
  className = '',
  fill = '#36395E',
}: VisualizerProps) => {
  const canvasRef = useRef(null);
  const [contextSetup, setContextSetup] = useState(false);

  const canvasWidth = () => (width > 700 ? 700 : width);

  const canvasHeight = () => 300;

  const visualize = () => {
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

      const draw = () => {
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray); // get waveform data and put it into the array created above

        ctx.fillStyle = fill; // draw wave with canvas
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

      draw();
    } catch (error) {
      onError && onError(error);
    }
  };

  useLayoutEffect(() => {
    if (audio && playing) {
      if (!contextSetup) {
        visualize();
        setContextSetup(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio, playing]);

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
