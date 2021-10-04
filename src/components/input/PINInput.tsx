import React, { useRef } from 'react';
import PinInput from 'react-pin-input';

type InputType = 'numeric' | 'custom';

interface PINInputProps {
  label: string;
  id: string;
  type?: InputType | undefined;
  length?: number;
  disabled?: boolean;
  focus?: boolean;
  secret?: boolean;
  onChange?: (value: string, index: number) => void;
  onComplete?: (value: string, index: number) => void;
}

const PINInput = ({
  label,
  id,
  length = 4,
  secret = true,
  onChange,
  onComplete,
  disabled,
  focus,
  type = 'numeric',
}: PINInputProps): JSX.Element => {
  const pin = useRef(null);

  return (
    <div className="form-control-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <PinInput
        length={length}
        focus={focus}
        disabled={disabled}
        secret={secret}
        ref={pin}
        type={type}
        onChange={onChange}
        onComplete={onComplete}
        inputMode="number"
        style={{ padding: '0' }}
        inputStyle={{
          border: 'none',
          background: '$color-f7f7f7',
          borderRadius: '6px',
          height: '64px',
          width: '64px',
        }}
        inputFocusStyle={{
          border: '1px solid #454D45',
          background: '$color-f7f7f7',
          borderRadius: '6px',
        }}
      />
    </div>
  );
};

export default PINInput;
