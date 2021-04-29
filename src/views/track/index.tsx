import { FaPlay, FaPause } from 'react-icons/fa';
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from 'react-icons/bs';
import { RiShuffleFill, RiRepeat2Fill, RiRepeatOneFill } from 'react-icons/ri';

import { useSelector } from 'react-redux';
import { Button } from '../../components';
import './styles.css';
import { songTitle } from '../../utils';

type TrackProps = {
  song?: any;
  playing?: boolean;
  onNext?: Function;
  onPrev?: Function;
  onPlay?: Function;
  onPause?: Function;
  slider?: React.ReactNode;
  visualizer?: React.ReactNode;
};

const Track = ({
  song,
  playing,
  onNext,
  onPrev,
  onPlay,
  onPause,
  slider,
  visualizer,
}: TrackProps) => {
  const settings = useSelector((state: any) => state.settings);

  const color = settings.light ? 'black' : 'white';

  const title = songTitle(song);

  return (
    <div className="track">
      {slider}
      <div className="track__content">
        <div className="track__details">
          <h1>{title}</h1>
          <p></p>
        </div>
        <div className="track__controls">
          <div className="track__controls__btn">
            <RiShuffleFill size={24} color={color} />
          </div>
          <div
            className="track__controls__btn"
            onClick={() => onPrev && onPrev()}
          >
            <BsFillSkipBackwardFill size={28} color={color} />
          </div>
          <div className="track__controls__btn">
            <Button
              size={64}
              active={playing}
              onClick={() =>
                playing ? onPause && onPause() : onPlay && onPlay()
              }
            >
              {playing ? <FaPause size={22} /> : <FaPlay size={22} />}
            </Button>
          </div>
          <div
            className="track__controls__btn"
            onClick={() => onNext && onNext()}
          >
            <BsFillSkipForwardFill size={28} color={color} />
          </div>
          <div className="track__controls__btn">
            <RiRepeat2Fill size={24} color={color} />
          </div>
        </div>
      </div>
      {settings.visualizer && visualizer}
    </div>
  );
};

export default Track;
