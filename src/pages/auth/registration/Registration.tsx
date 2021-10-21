import React, { useState, useEffect, ChangeEvent, MouseEventHandler } from 'react';
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
import { emailRegex, nameSchema, passwordSchema, phonenumberSchema } from '../../../utils/validators';

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const Registration = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    name: null,
    email: null,
    phoneNumber: null,
    password: null,
  });

  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void | null => {
    const {
      target: { value },
    } = e;
    setName(value);
    const nameErrors = nameSchema.validate(value);
    errorHandler('name', nameErrors, 'Name is invalid');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void | null => {
    const {
      target: { value },
    } = e;
    setEmail(value);
    const isValidEmail = emailRegex.test(value);
    errorHandler('email', isValidEmail, 'Email is invalid');
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void | null => {
    const {
      target: { value },
    } = e;
    setPhoneNumber(value);
    const phoneNumberErrors = phonenumberSchema.validate(value);
    errorHandler('phoneNumber', phoneNumberErrors, 'Phone Number is invalid');
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
      register(
        { name, email, phoneNumber, password },
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
        <p className="form-title">Take the first step towards a financially secure future.</p>
        <p className="form-subtitle">Sign up for Awabah to get started.</p>

        <Input
          type="text"
          id="name"
          name="name"
          label="Name"
          placeholder="Full Name"
          value={name}
          disabled={inputDisabled}
          onInputChange={handleNameChange}
          required={true}
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
        />

        {password.length > 0 && <PasswordStrengthIndicator password={password} />}

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
            Create Account
          </button>
        )}
        <p className="alternative">
          Already have an account?
          <Link to={{ pathname: ROUTE_URLS.AUTHENTICATION_URL }} className="alt-link">
            {' '}
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Registration;
