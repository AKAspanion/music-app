import './styles.css';

import back from '../../assets/icons/back.svg';
import menu from '../../assets/icons/menu.svg';

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <div className="header">
      <div className="header__menu__left">
        <div className="header__icon">
          <img alt="close" src={back} />
        </div>
      </div>
      <div className="header__menu__right">
        <div className="header__icon">
          <img alt="close" src={menu} />
        </div>
      </div>
    </div>
  );
};

export default Header;
