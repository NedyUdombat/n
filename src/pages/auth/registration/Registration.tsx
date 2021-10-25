import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

/** Component(s) */
import AuthLayout from '../../../layouts/AuthLayout';
import Input from '../../../components/input/Input';
import TelInput from '../../../components/input/TelInput';
import PasswordStrengthIndicator from '../../../components/password-strength-indicator';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';
import { ErrorsType } from '../../../@types/error.type';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Action(s) */
import { register } from '../../../store/modules/auth';
import {
  emailRegex,
  singleNameSchema,
  passwordSchema,
  phonenumberSchema,
} from '../../../utils/validators';

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const Registration = (): JSX.Element => {
  const [firstName, setFirstname] = useState<string>('');
  const [lastName, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    password: null,
  });

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
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

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
  ): void | null => {
    const {
      target: { value },
    } = e;
    const nameErrors = singleNameSchema.validate(value);
    if (type === 'firstName') {
      setFirstname(value);
      errorHandler('firstName', nameErrors, 'Name is invalid');
    } else {
      setLastname(value);
      errorHandler('lastName', nameErrors, 'Name is invalid');
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

  const handlePhoneNumberChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void | null => {
    const {
      target: { value },
    } = e;
    setPhoneNumber(value);
    const phoneNumberErrors = phonenumberSchema.validate(value);
    errorHandler('phoneNumber', phoneNumberErrors, 'Phone Number is invalid');
  };

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void | null => {
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
      register(
        { firstName, lastName, email, phoneNumber, password },
        () => history.push(ROUTE_URLS.VERIFICATION_URL),
        () => {
          setInputDisabled(false);
          setPassword('');
        },
      ),
    );
  };

  return (
    <AuthLayout>
      <form className="mx-auto auth registration">
        <p className="form-title">
          Take the first step towards a financially secure future.
        </p>
        <p className="form-subtitle">Sign up for Awabah to get started.</p>

        <Input
          type="text"
          id="firstName"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          value={firstName}
          disabled={inputDisabled}
          onInputChange={(e) => handleNameChange(e, 'firstName')}
          required={true}
          hasError={
            errors.firstName !== null && errors.firstName !== 'valid'
              ? true
              : false
          }
        />
        <Input
          type="text"
          id="lastName"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          disabled={inputDisabled}
          onInputChange={(e) => handleNameChange(e, 'lastName')}
          required={true}
          hasError={
            errors.lastName !== null && errors.lastName !== 'valid'
              ? true
              : false
          }
        />
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
          hasError={
            errors.email !== null && errors.email !== 'valid' ? true : false
          }
        />
        <TelInput
          id="phone"
          name="phone"
          label="Phone"
          placeholder=""
          value={phoneNumber}
          disabled={inputDisabled}
          onChange={handlePhoneNumberChange}
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
          hasError={
            errors.password !== null && errors.password !== 'valid'
              ? true
              : false
          }
        />

        {password.length > 0 && (
          <PasswordStrengthIndicator password={password} />
        )}

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
            className={`btn create-btn${disabled === true ? ` disabled` : ``}`}
            onClick={handleSubmit}
            disabled={disabled}
          >
            Create Account
          </button>
        )}
        <p className="alternative">
          Already have an account?
          <Link
            to={{ pathname: ROUTE_URLS.AUTHENTICATION_URL }}
            className="alt-link"
          >
            {' '}
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Registration;
