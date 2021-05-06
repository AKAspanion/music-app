import Input from '../../components/input';
import './styles.css';

type HomeProps = {
  open?: boolean;
  onSearch?: Function;
  showSearch: boolean;
  playlist: React.ReactNode;
};

const Home = ({ open, onSearch, showSearch, playlist }: HomeProps) => {
  return open ? (
    <div className="home">
      {showSearch && (
        <div className="home__input">
          <Input
            type="search"
            placeholder="Search"
            onChange={(e: string) => onSearch && onSearch(e)}
          />
        </div>
      )}
      {playlist}
    </div>
  ) : null;
};

export default Home;
