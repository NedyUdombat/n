import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
} from 'react';
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
import { resendCode } from '../../../store/modules/verification';
import { emailRegex } from '../../../utils/validators';

interface ErrorsType {
  [propertyName: string]: string | null;
}

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const ResendToken = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    email: null,
  });

  const isLoading = useSelector(
    (state: RootState) => state.verification.isLoading,
  );
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
      resendCode(
        {
          email,
        },
        history,
      ),
    );
    setInputDisabled(false);
    setEmail('');
  };

  return (
    <AuthLayout>
      <form className="mx-auto auth forgot-password">
        <p className="form-title">Didn&apos;t Get Code?</p>
        <p className="form-subtitle">
          Enter your email address below. A new code will be sent to your
          address.
        </p>

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
            Get Code
          </button>
        )}
        <p className="alternative">
          <Link
            to={{ pathname: ROUTE_URLS.VERIFICATION_URL }}
            className="alt-link"
          >
            Go back
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ResendToken;
