import './styles.css';

type HomeProps = {
  playlist: React.ReactNode;
};

const Home = ({ playlist }: HomeProps) => {
  return <div className="home">{playlist}</div>;
};

export default Home;
