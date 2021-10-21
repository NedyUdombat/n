import React, { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';

/** Component(s) */
import AuthLayout from '../../../layouts/AuthLayout';
import Input from '../../../components/input/Input';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Action(s) */
import { authenticate } from '../../../store/modules/auth';
import { emailRegex, passwordSchema } from '../../../utils/validators';

interface ErrorsType {
  [propertyName: string]: string | null;
}

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const Authentication = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    email: null,
    password: null,
  });

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const errorHandler = (field: string, errorState: boolean, errorMessage: string) => {
    const newErrorObject = Object.assign({}, errors);
    if (!errorState) {
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

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void | null => {
    const {
      target: { value },
    } = e;
    setPassword(value);
    const passwordErrors = passwordSchema.validate(value);
    errorHandler('password', passwordErrors, 'Password is invalid');
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
      authenticate(
        {
          email,
          password,
        },
        (bvnVerified: boolean) => history.push(bvnVerified ? ROUTE_URLS.DASHBOARD_URL : ROUTE_URLS.KYC),
        () => {
          setInputDisabled(false);
          setDisabled(true);
          setPassword('');
        },
      ),
    );
  };

  return (
    <AuthLayout>
      <form className="mx-auto auth authentication">
        <p className="form-title">Sign in</p>
        <p className="form-subtitle">Sign in to your Awabah acccount.</p>

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
            Sign in
          </button>
        )}
        <p className="alternative">
          New here?
          <Link to={{ pathname: ROUTE_URLS.REGISTRATION_URL }} className="alt-link">
            {' '}
            Sign up for Awabah
          </Link>
        </p>
        {Object.keys(error).length > 1 && error.message === 'You are yet to verify your phone number' ? (
          <Link to={{ pathname: ROUTE_URLS.VERIFICATION_URL }} className="alt-link verify-link">
            Verify Phone Number
          </Link>
        ) : (
          <Link to={{ pathname: ROUTE_URLS.FORGOT_PASSWORD_URL }} className="alt-link">
            Forgot password?
          </Link>
        )}
      </form>
    </AuthLayout>
  );
};

export default Authentication;
