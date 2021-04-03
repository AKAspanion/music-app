import { Button } from '../../components';
import './styles.css';

import play from '../../assets/icons/play.svg';
import pause from '../../assets/icons/pause.svg';
import songIcon from '../../assets/icons/song.svg';

type NowPlayingProps = {
  song?: any;
  open?: boolean;
  width?: number;
  playing: boolean;
  onPlay?: Function;
  onPause?: Function;
  percent?: number;
};

const NowPlaying = ({
  song,
  onPlay,
  onPause,
  percent,
  playing,
  open = true,
  width = 300,
}: NowPlayingProps) => {
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
        <div className="nowplaying__title__wrapper">
          <img className="nowplaying__title__icon" alt="song" src={songIcon} />
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
            <img alt="play/pause" src={playing ? pause : play} />
          </Button>
        </div>

        <div
          style={{ width: `${percent}%` }}
          className="nowplaying__progress"
        ></div>
        <div className="nowplaying__progress__bg"></div>
      </div>
    </div>
  );
};

export default NowPlaying;
