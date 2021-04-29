import './styles.css';

type ButtonProps = {
  size?: number;
  active?: boolean;
  onClick?: Function;
  children?: React.ReactNode;
};

const Button = ({ size = 48, active, onClick, children }: ButtonProps) => {
  return (
    <button
      style={{ '--button-size': `${size}px` } as any}
      className={`button__wrapper ${active ? 'button__wrapper--active' : ''}`}
      onClick={() => onClick && onClick()}
    >
      <div className="button__content">{children}</div>
    </button>
  );
};

export default Button;
