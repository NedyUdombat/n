import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';

/** Component(s) */
import AuthLayout from '../../../layouts/AuthLayout';
import Input from '../../../components/input/Input';
import PasswordStrengthIndicator from '../../../components/password-strength-indicator';

// Icon(s)
import SuccessIcon from '../../../assets/icons/sucessIcon.svg';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Action(s) */
import { resetPassword } from '../../../store/modules/auth';
import { passwordSchema } from '../../../utils/validators';

interface ErrorsType {
  [propertyName: string]: string | null;
}

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const ResetPassword = (): JSX.Element => {
  const [password, setPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    password: null,
    confirmNewPassword: null,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();
  const location = useLocation();

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

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void | null => {
    const {
      target: { value, id },
    } = e;
    if (id === 'password') {
      setPassword(value);
    } else {
      setConfirmNewPassword(value);
    }
    const passwordErrors = passwordSchema.validate(value);
    errorHandler(
      id === 'password' ? 'password' : 'confirmNewPassword',
      passwordErrors,
      'Password is invalid',
    );
  };

  useEffect(() => {
    if (validateForm(errors)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errors]);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setInputDisabled(true);

    dispatch(
      resetPassword({
        password,
        confirm: confirmNewPassword,
        token: location?.search?.split('?token=')[1],
      }),
    );
    setShowSuccessMessage(true);
    setPassword('');
    setConfirmNewPassword('');
    setInputDisabled(false);
  };

  return (
    <AuthLayout>
      <form className="mx-auto auth forgot-password">
        {!showSuccessMessage ? (
          <>
            <p className="form-title">Set a new password</p>

            <Input
              type="password"
              id="password"
              name="password"
              label="Password"
              placeholder=""
              value={password}
              disabled={inputDisabled}
              onInputChange={handlePasswordChange}
              required={true}
            />

            {password.length > 0 && (
              <PasswordStrengthIndicator password={password} />
            )}

            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm New Password"
              placeholder=""
              value={confirmNewPassword}
              disabled={inputDisabled}
              onInputChange={handlePasswordChange}
              required={true}
            />

            {isLoading ? (
              <button
                type="button"
                className="btn create-btn disabled"
                onClick={() => null}
                disabled={true}
              >
                <i className="fas fa-circle-notch fa-pulse" />
              </button>
            ) : (
              <button
                type="button"
                className={`btn create-btn${
                  disabled === true ? ` disabled` : ``
                }`}
                onClick={handleSubmit}
                disabled={disabled}
              >
                Save password
              </button>
            )}
          </>
        ) : (
          <div className="success-container">
            <img
              src={SuccessIcon}
              alt="Success Icon"
              className="success-icon"
            />
            <p className="form-title">Password reset!</p>
            <Link to={{ pathname: ROUTE_URLS.DASHBOARD_URL }} className="link">
              Sign In
            </Link>
          </div>
        )}
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
