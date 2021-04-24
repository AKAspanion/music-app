import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './styles.css';

type InputProps = {
  onChange?: Function;
  placeholder?: string;
};

const Input = ({ onChange, placeholder = 'Search...' }: InputProps) => {
  const [inFocus, setFocus] = useState(false);
  return (
    <div
      className={`input__wrapper ${
        inFocus ? 'input__wrapper--focus' : ''
      }`.trim()}
    >
      <input
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={e => onChange && onChange(e.target.value)}
      />
      <div className="input__icon">
        <FaSearch size={24} />
      </div>
    </div>
  );
};

export default Input;
