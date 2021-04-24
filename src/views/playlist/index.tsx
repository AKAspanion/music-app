import './styles.css';

import play from '../../assets/icons/play.svg';
import pause from '../../assets/icons/pause.svg';
import del from '../../assets/icons/delete.svg';

type PlaylistProps = {
  songs: any[];
  grid?: boolean;
  playState?: any;
  onClick?: Function;
  onDelete?: Function;
};

const Playlist = ({
  grid = false,
  songs,
  onClick,
  onDelete,
  playState = {},
}: PlaylistProps) => {
  const { index, playing } = playState;

  return (
    <div className={`playlist ${grid ? 'playlist--grid' : ''}`.trim()}>
      {songs.map(({ name }: any, i: number) => (
        <div
          key={i}
          className={`playlist__item ${
            index === i ? 'playlist__item--selected' : ''
          }`}
        >
          <div className="playlist__icon" onClick={() => onClick && onClick(i)}>
            <img alt="play" src={index === i && playing ? pause : play} />
          </div>
          <div title={name} className="playlist__name">
            {name}
          </div>
          <div
            className="playlist__icon playlist__icon--right"
            onClick={() => onDelete && onDelete(i)}
          >
            <img alt="play" src={del} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
