import { useSelector } from 'react-redux';
import './styles.css';

type TrackProps = {
  slider?: React.ReactNode;
  visualizer?: React.ReactNode;
};

const Track = ({ slider, visualizer }: TrackProps) => {
  const settings = useSelector((state: any) => state.settings);

  return (
    <div className="track">
      {slider}
      {settings.visualizer && visualizer}
    </div>
  );
};

export default Track;
