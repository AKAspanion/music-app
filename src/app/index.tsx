import { useDispatch } from 'react-redux';

import { addSongs } from '../redux';
import './styles.css';

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <input
        multiple
        type="file"
        accept="audio/mp3"
        onChange={e => dispatch(addSongs(e.target.files))}
      />
    </div>
  );
}

export default App;
