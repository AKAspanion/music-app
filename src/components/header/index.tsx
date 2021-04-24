import './styles.css';

import more from '../../assets/icons/more.svg';
import add from '../../assets/icons/add.svg';

type HeaderProps = {
  onLeftIconClick?: Function;
  onRightIconClick?: Function;
};

const Header = ({ onLeftIconClick, onRightIconClick }: HeaderProps) => {
  return (
    <div className="header">
      <div className="header__menu__left">
        <div
          className="header__icon"
          onClick={() => onLeftIconClick && onLeftIconClick()}
        >
          <img alt="close" src={more} />
        </div>
      </div>
      <div className="header__menu__right">
        <div
          className="header__icon"
          onClick={() => onRightIconClick && onRightIconClick()}
        >
          <img alt="close" src={add} />
        </div>
      </div>
    </div>
  );
};

export default Header;
