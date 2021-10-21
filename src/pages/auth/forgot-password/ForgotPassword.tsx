import React, { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';

/** Component(s) */
import AuthLayout from '../../../layouts/AuthLayout';
import Input from '../../../components/input/Input';

// Icon(s)
import SuccessIcon from '../../../assets/icons/sucessIcon.svg';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Action(s) */
import { forgotPassword } from '../../../store/modules/auth';
import { emailRegex } from '../../../utils/validators';

interface ErrorsType {
  [propertyName: string]: string | null;
}

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    email: null,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();

  const errorHandler = (field: string, error: boolean, errorMessage: string) => {
    const newErrorObject = Object.assign({}, errors);
    if (!error) {
      newErrorObject[field] = errorMessage;
      setErrors(newErrorObject);
    } else {
      newErrorObject[field] = 'valid';
      setErrors(newErrorObject);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void | null => {
    const {
      target: { value },
    } = e;
    setEmail(value);
    const isValidEmail = emailRegex.test(value);
    errorHandler('email', isValidEmail, 'Email is invalid');
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
      forgotPassword(
        {
          email,
        },
        () => {
          setInputDisabled(false);
          setShowSuccessMessage(true);
        },
      ),
    );
  };

  return (
    <AuthLayout>
      <form className="mx-auto auth forgot-password">
        {!showSuccessMessage ? (
          <>
            <p className="form-title">Forgot Password?</p>
            <p className="form-subtitle">Enter your email address below. A password reset link will be sent to you.</p>

            <Input
              type="email"
              id="email"
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              value={email}
              disabled={inputDisabled}
              onInputChange={handleEmailChange}
              required={true}
            />

            {isLoading ? (
              <button type="button" className="btn create-btn disabled" onClick={() => null} disabled={true}>
                <i className="fas fa-circle-notch fa-pulse" />
              </button>
            ) : (
              <button
                type="button"
                className={`btn create-btn${disabled === true ? ` disabled` : ``}`}
                onClick={handleSubmit}
                disabled={disabled}
              >
                Reset password
              </button>
            )}
            <p className="alternative">
              <Link to={{ pathname: ROUTE_URLS.AUTHENTICATION_URL }} className="alt-link">
                Go back
              </Link>
            </p>
          </>
        ) : (
          <div className="success-container">
            <img src={SuccessIcon} alt="Success Icon" className="success-icon" />
            <p className="form-title">Email sent</p>
            <p className="form-subtitle">Check your email and click on the link to reset your password</p>
          </div>
        )}
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
