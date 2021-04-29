import { useSelector } from 'react-redux';
import { BsMusicNote } from 'react-icons/bs';
import { FaPause, FaPlay } from 'react-icons/fa';

import { Button } from '../../components';
import './styles.css';

type NowPlayingProps = {
  song?: any;
  open?: boolean;
  width?: number;
  playing: boolean;
  onPlay?: Function;
  onPause?: Function;
  onClick?: Function;
  percent?: number;
  visualizer?: React.ReactNode;
};

const NowPlaying = ({
  song,
  onPlay,
  onPause,
  onClick,
  percent,
  playing,
  open = true,
  width = 300,
  visualizer,
}: NowPlayingProps) => {
  const settings = useSelector((state: any) => state.settings);

  const songTitle = () => {
    let title = 'No title';
    if (song && song.name) {
      title = song.name;
    }

    return title.split('.')[0];
  };

  return (
    <div className={`nowplaying ${open ? 'nowplaying--open' : ''}`.trim()}>
      <div style={{ width }} className="nowplaying__container">
        <div
          onClick={() => onClick && onClick()}
          className="nowplaying__title__wrapper"
        >
          <div className="nowplaying__icon">
            <BsMusicNote size={32} />
          </div>
          <div title={songTitle()} className="nowplaying__title">
            {songTitle()}
          </div>
        </div>
        <div className="nowplaying__button">
          <Button
            onClick={() =>
              playing ? onPause && onPause() : onPlay && onPlay()
            }
          >
            {playing ? <FaPause size={18} /> : <FaPlay size={18} />}
          </Button>
        </div>

        <div
          style={{ width: `${percent}%` }}
          className="nowplaying__progress"
        ></div>
        <div className="nowplaying__visualizer">
          {settings.visualizer && visualizer}
        </div>
        <div className="nowplaying__progress__bg"></div>
      </div>
    </div>
  );
};

export default NowPlaying;
