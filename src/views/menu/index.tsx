import { Header } from '../../components';
import './styles.css';

import { FaWindowClose } from 'react-icons/fa';

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
        rightIcon={<FaWindowClose size={24} />}
        onRightIconClick={() => onClose && onClose()}
      />
      <div className="menu__content"></div>
    </div>
  );
};

export default Menu;
