import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

/** Component(s) */
import Input from '../input/Input';
import PINInput from '../input/PINInput';
import Divider from '../divider';
import PasswordStrengthIndicator from '../password-strength-indicator';

/** Util(s) */
import { passwordSchema } from '../../utils/validators';

/** Type(s) */
import { ErrorsType } from '../../@types/error.type';

/** Action(s) */
import { changePassword } from '../../store/modules/auth';

interface InputField {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const Security = (): JSX.Element => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<ErrorsType>({
    currentPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const errorHandler = (
    field: string,
    error: boolean,
    errorMessage: string,
  ) => {
    const newErrorObject = Object.assign({}, errors);
    if (!error) {
      newErrorObject[field] = errorMessage;
      setErrors(newErrorObject);
    } else {
      newErrorObject[field] = 'valid';
      setErrors(newErrorObject);
    }
  };

  useEffect(() => {
    const passwordErrors = passwordSchema.validate(currentPassword);
    if (currentPassword !== '') {
      errorHandler('currentPassword', passwordErrors, 'Password is invalid');
    } else {
      errorHandler('currentPassword', passwordErrors, 'valid');
    }
  }, [currentPassword]);

  useEffect(() => {
    const passwordErrors = passwordSchema.validate(newPassword);
    if (newPassword !== '') {
      errorHandler('newPassword', passwordErrors, 'New Password is invalid');
    } else {
      errorHandler('newPassword', passwordErrors, 'valid');
    }
  }, [newPassword]);

  useEffect(() => {
    const passwordErrors = passwordSchema.validate(confirmNewPassword);
    if (confirmNewPassword !== '') {
      errorHandler(
        'confirmNewPassword',
        passwordErrors,
        'Confirm Password is invalid',
      );
    } else {
      errorHandler('confirmNewPassword', passwordErrors, 'valid');
    }
  }, [confirmNewPassword]);

  useEffect(() => {
    if (validateForm(errors)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errors]);

  const _passwordFields: InputField[] = [
    {
      type: 'password',
      id: 'currentPassword',
      name: 'currentPassword',
      label: 'Current password',
      placeholder: '',
      value: currentPassword,
      disabled: false,
      onInputChange: (e) => setCurrentPassword(e.target.value),
      required: true,
    },
    {
      type: 'password',
      id: 'newPassword',
      name: 'newPassword',
      label: 'New password',
      placeholder: '',
      value: newPassword,
      disabled: false,
      onInputChange: (e) => setNewPassword(e.target.value),
      required: true,
    },
    {
      type: 'password',
      id: 'confirmNewPassword',
      name: 'confirmNewPassword',
      label: 'Confirm new password',
      placeholder: '',
      value: confirmNewPassword,
      disabled: false,
      onInputChange: (e) => setConfirmNewPassword(e.target.value),
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

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    dispatch(
      changePassword(
        { currentPassword, newPassword, confirmNewPassword },
        history,
      ),
    );
  };

  return (
    <section className="security-section">
      <form className="security-password-form">
        <p className="form-title">Change password</p>
        <div className="security-password-form-control-group">
          {_passwordFields.map((field) => (
            <div key={field.id}>
              <Input
                type={field.type}
                id={field.id}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={field.value}
                disabled={field.disabled}
                onInputChange={field.onInputChange}
                required={field.required}
                hasError={
                  errors[field.id] !== null && errors[field.id] !== 'valid'
                    ? true
                    : false
                }
              />

              {field.value.length > 0 && (
                <PasswordStrengthIndicator password={field.value} />
              )}
            </div>
          ))}
        </div>

        <div className="submit-btn-section">
          <button
            className={`btn submit-btn${disabled === true ? ` disabled` : ``}`}
            disabled={disabled}
            onClick={handleSubmit}
          >
            Save password
          </button>
        </div>
      </form>
      <Divider />

      <form className="security-password-form d-none">
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
