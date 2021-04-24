import { Header } from '../../components';
import './styles.css';

import { FaPlus } from 'react-icons/fa';

type MenuProps = {
  show: boolean;
  onClose: Function;
};

const Menu = ({ show, onClose }: MenuProps) => {
  return (
    <div className={`menu ${show ? 'menu--show' : ''}`.trim()}>
      <Header
        title={'Settings'}
        leftIcon={null}
        rightIcon={
          <div style={{ transform: 'rotate(45deg) translateY(2px)' }}>
            <FaPlus size={24} />
          </div>
        }
        onRightIconClick={() => onClose && onClose()}
      />
      <div className="menu__content"></div>
    </div>
  );
};

export default Menu;
