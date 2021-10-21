import React, { useEffect, ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  inputClassName?: string;
  placeholder?: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void | null;
  disabled?: boolean | undefined;
  value?: string | number;
  required?: boolean | undefined;
  optional?: boolean;
}

const Input = ({
  type,
  id,
  name,
  label,
  inputClassName,
  placeholder,
  onInputChange,
  disabled,
  value,
  required,
  optional,
}: InputProps): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputType, setInputType] = React.useState('text');

  const handlePassswordStateChange = () => {
    setShowPassword(!showPassword);
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  useEffect(() => {
    setInputType(type !== undefined ? type : 'text');
  }, [type]);

  return (
    <div className="form-control-group">
      <label htmlFor={id} className="form-label">
        {label} {optional && <span className="optional-input-label">(optional)</span>}
      </label>
      <input
        type={inputType}
        id={id}
        name={name}
        className={`form-control${inputClassName ? ` ${inputClassName}` : ''}`}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
        disabled={disabled}
        value={value}
        required={required}
      />
      {type === 'password' && (
        <button type="button" className="password-lock" onClick={() => handlePassswordStateChange()}>
          {showPassword ? (
            <i className="fas fa-eye" />
          ) : (
            <i style={{ color: '#ccc' }} className="fas fa-eye-slash text-secondary" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
