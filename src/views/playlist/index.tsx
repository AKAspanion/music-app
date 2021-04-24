import './styles.css';
import { FaPause, FaPlay, FaTrash } from 'react-icons/fa';

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
    <div
      className={`playlist ${grid ? 'playlist--grid' : ''} ${
        index > -1 ? 'playlist--bottom-padded' : ''
      }`.trim()}
    >
      {songs.map(({ name }: any, i: number) => (
        <div
          key={i}
          className={`playlist__item ${
            index === i ? 'playlist__item--selected' : ''
          }`}
        >
          <div className="playlist__icon" onClick={() => onClick && onClick(i)}>
            {index === i && playing ? (
              <FaPause size={18} />
            ) : (
              <FaPlay size={18} />
            )}
          </div>
          <div title={name} className="playlist__name">
            {name}
          </div>
          <div
            className="playlist__icon playlist__icon--right"
            onClick={() => onDelete && onDelete(i)}
          >
            <FaTrash size={18} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
