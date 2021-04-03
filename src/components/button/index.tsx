import './styles.css';

type ButtonProps = {
  size?: number;
  onClick?: Function;
  children?: React.ReactNode;
};

const Button = ({ size = 48, onClick, children }: ButtonProps) => {
  return (
    <button
      style={{ '--button-size': `${size}px` } as any}
      className="button__wrapper"
      onClick={() => onClick && onClick()}
    >
      <div className="button__content">{children}</div>
    </button>
  );
};

export default Button;
