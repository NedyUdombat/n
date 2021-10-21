import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';

/** Component(s) */
import AuthLayout from '../../../layouts/AuthLayout';
import PINInput from '../../../components/input/PINInput';

/** Utils */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Action(s) */
import { verify } from '../../../store/modules/verification';

const Verification = (): JSX.Element => {
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  const isLoading = useSelector(
    (state: RootState) => state.verification.isLoading,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePinComplete = (value: string): void | null => {
    handleSubmit(value);
  };

  const handleSubmit = (value: string): void => {
    setInputDisabled(true);

    dispatch(
      verify(
        {
          token: value.toLowerCase(),
        },
        () => history.push(ROUTE_URLS.AUTHENTICATION_URL),
        () => {
          setInputDisabled(false);
        },
      ),
    );
  };

  return (
    <AuthLayout>
      <form className="mx-auto auth forgot-password">
        <p className="form-title">Enter verification code</p>
        <p className="form-subtitle">
          A 6-digit code was sent to your phone number
        </p>

        {!isLoading ? (
          <>
            <PINInput
              label="Enter code"
              id="verificationCode"
              length={6}
              disabled={inputDisabled}
              onComplete={handlePinComplete}
              type="custom"
              focus={true}
            />

            <p className="alternative">
              Code not sent?{' '}
              <Link
                to={{ pathname: ROUTE_URLS.RESEND_TOKEN_URL }}
                className="alt-link"
              >
                <strong>Resend code</strong>
              </Link>
            </p>
          </>
        ) : (
          <div className="loader">
            <i className="fas fa-circle-notch fa-pulse" />
          </div>
        )}
      </form>
    </AuthLayout>
  );
};

export default Verification;
