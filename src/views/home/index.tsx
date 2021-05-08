import Input from '../../components/input';
import './styles.css';

type HomeProps = {
  onSearch?: Function;
  showSearch: boolean;
  playlist: React.ReactNode;
};

const Home = ({ onSearch, showSearch, playlist }: HomeProps) => {
  return (
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
  );
};

export default Home;
