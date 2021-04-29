import { FaPlus } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../../components';
import { SET_GRID, SET_THEME, SET_VISUALIZER } from '../../redux/actions';
import './styles.css';

type MenuProps = {
  show: boolean;
  onClose: Function;
};

const Menu = ({ show, onClose }: MenuProps) => {
  const dispatch = useDispatch();

  const settings = useSelector((state: any) => state.settings);

  const menuMeta = [
    {
      id: 1,
      key: 'grid',
      name: 'Grid style song list',
      onClick: () => dispatch(SET_GRID(!settings.grid)),
    },
    {
      id: 2,
      key: 'visualizer',
      name: 'Show visualizer',
      onClick: () => dispatch(SET_VISUALIZER(!settings.visualizer)),
    },
    {
      id: 3,
      key: 'light',
      name: 'Light theme',
      onClick: () => dispatch(SET_THEME(!settings.light)),
    },
  ];

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
      <div className="menu__content">
        {menuMeta.map(({ id, key, name, onClick }) => (
          <div
            key={id}
            title={name}
            onClick={() => onClick()}
            className={`menu__item`}
          >
            <div className="menu__item__name">{name}</div>
            <div className="menu__item--spacer"> </div>
            {settings[key] ? (
              <MdCheckBox size={24} />
            ) : (
              <MdCheckBoxOutlineBlank size={24} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
