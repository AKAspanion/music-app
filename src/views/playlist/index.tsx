import './styles.css';

type PlaylistProps = {
  songs: any[];
  grid?: boolean;
  onClick: Function;
};

const PLaylist = ({ grid = false, songs, onClick }: PlaylistProps) => {
  return (
    <div className={`playlist ${grid ? 'playlist--grid' : ''}`.trim()}>
      {songs.map(({ name }: any, index: number) => (
        <div
          key={index}
          className="playlist__item"
          onClick={() => onClick && onClick(index)}
        >
          <div className="playlist__name">{name}</div>
        </div>
      ))}
    </div>
  );
};

export default PLaylist;
