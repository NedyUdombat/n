import React from 'react';

/** Component(s) */
import Input from '../input/Input';
import PINInput from '../input/PINInput';
import Divider from '../divider';

interface InputField {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  onInputChange: () => null;
  required: boolean;
}

const Security = (): JSX.Element => {
  const _passwordFields: InputField[] = [
    {
      type: 'password',
      id: 'newPassword',
      name: 'newPassword',
      label: 'New password',
      placeholder: '',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: true,
    },
    {
      type: 'password',
      id: 'confirmPassword',
      name: 'confirmPassword',
      label: 'Confirm new password',
      placeholder: '',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: true,
    },
  ];

  const _pinFields: InputField[] = [
    {
      type: 'tel',
      id: 'newPIN',
      name: 'newPIN',
      label: 'New PIN',
      placeholder: '',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: true,
    },
    {
      type: 'tel',
      id: 'confirmPIN',
      name: 'confirmPIN',
      label: 'Confirm new PIN',
      placeholder: '',
      value: '',
      disabled: false,
      onInputChange: () => null,
      required: true,
    },
  ];

  return (
    <section className="security-section">
      <form className="security-password-form">
        <p className="form-title">Change password</p>
        <div className="security-password-form-control-group">
          {_passwordFields.map((field) => (
            <Input
              key={field.id}
              type={field.type}
              id={field.id}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value}
              disabled={field.disabled}
              onInputChange={field.onInputChange}
              required={field.required}
            />
          ))}
        </div>

        <div className="submit-btn-section">
          <button className="btn submit-btn disabled">Save password</button>
        </div>
      </form>
      <Divider />

      <form className="security-password-form">
        <p className="form-title">Change wallet PIN</p>
        <div className="security-password-form-control-group">
          {_pinFields.map((field) => (
            <PINInput key={field.id} label={field.label} id={field.id} />
          ))}
        </div>

        <div className="submit-btn-section">
          <button className="btn submit-btn disabled">Save PIN</button>
        </div>
      </form>
    </section>
  );
};

export default Security;
