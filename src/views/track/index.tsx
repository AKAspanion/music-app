import './styles.css';

type TrackProps = {
  slider?: React.ReactNode;
  visualizer?: React.ReactNode;
};

const Track = ({ slider, visualizer }: TrackProps) => {
  return (
    <div className="track">
      {slider}
      {visualizer}
    </div>
  );
};

export default Track;
