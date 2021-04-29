import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from 'react-icons/bs';
import { RiShuffleFill, RiRepeat2Fill } from 'react-icons/ri';
// RiRepeatOneFill

import AudioSession from '../../services/audio-session';
import { Button } from '../../components';
import { songTitle } from '../../utils';
import './styles.css';

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
  const [meta, setMeta] = useState<any>(null);

  const settings = useSelector((state: any) => state.settings);

  const color = settings.light ? 'black' : 'white';

  const { tags = {} } = meta || {};

  const title = tags.title ?? songTitle(song);
  const artist = tags.artist ?? 'Unknown Artist';

  useEffect(() => {
    (async () => {
      const meta = await AudioSession.getMetadata(song);

      setMeta(meta);
    })();
  }, [song]);

  return (
    <div className="track">
      {slider}
      <div className="track__content">
        <div className="track__details">
          <h1>{title}</h1>
          <p>{artist}</p>
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
