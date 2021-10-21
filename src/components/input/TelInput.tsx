import React, { ChangeEvent } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface TelInputProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | null;
}

const TelInput = ({ label, id, value, onChange, placeholder, name, required, disabled }: TelInputProps) => {
  const handlePhoneNumberChange = (phone: string) => {
    const e = new Event('input', { bubbles: true });
    Object.defineProperty(e, 'target', {
      writable: false,
      value: {
        name: id,
        value: `+${phone}`,
      },
    });
    onChange(e as unknown as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="form-control-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <PhoneInput
        country={'ng'}
        value={value}
        placeholder={placeholder}
        onChange={handlePhoneNumberChange}
        inputProps={{
          name,
          required,
        }}
        enableSearch={true}
        disabled={disabled}
      />
    </div>
  );
};

export default TelInput;
