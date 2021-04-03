import { useRef, useLayoutEffect } from 'react';

type VisualizerProps = {
  audio: HTMLAudioElement;
  onError?: Function;
  playing: boolean;
};

const Visualizer = ({ audio, playing, onError }: VisualizerProps) => {
  const canvasRef = useRef(null);

  const visualize = () => {
    try {
      const ca: any = canvasRef.current!;
      const ctx: CanvasRenderingContext2D = ca.getContext('2d');

      const atx: AudioContext = new AudioContext();
      const analyser: AnalyserNode = atx.createAnalyser();

      analyser.fftSize = 2048;

      const source = atx.createMediaElementSource(audio);

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

      const draw = () => {
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

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx.lineTo(ca.width, ca.height / 2);
        ctx.stroke();
      };

      draw();
    } catch (error) {
      onError && onError(error);
    }
  };

  useLayoutEffect(() => {
    if (audio) {
      visualize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio]);

  return (
    <canvas
      style={{ visibility: playing ? 'visible' : 'hidden' }}
      ref={canvasRef}
      height="300"
      width="700"
    ></canvas>
  );
};
export default Visualizer;
