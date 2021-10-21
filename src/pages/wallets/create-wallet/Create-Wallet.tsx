import React, { useEffect, useState, ChangeEvent, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import moment from 'moment';

/** Component(s) */
import InnerPageNavBar from '../../../components/navbar/InnerPageNavBar';
import Input from '../../../components/input/Input';
import PINInput from '../../../components/input/PINInput';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';
import { ErrorsType } from '../../../@types/error.type';
import { Location } from '../../../@types/router.type';

/** Action(s) */
import { createWallet } from '../../../store/modules/wallet';
import { bvnSchema } from '../../../utils/validators';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

interface KYCPropsTypes {
  location: { state: { from: string } };
}

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const CreateWallet = ({ location: { state: locationState } }: KYCPropsTypes): JSX.Element => {
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [bvn, setBvn] = useState<string>('');
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errors, setErrors] = useState<ErrorsType>({
    dateOfBirth: null,
    pin: null,
    bvn: null,
  });

  const isLoading = useSelector((state: RootState) => state.wallet.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const location: Location = useLocation();

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

  const handleDOBChange = (e: ChangeEvent<HTMLInputElement>): void | null => {
    const {
      target: { value },
    } = e;
    setDateOfBirth(value);
    const dateErrors = moment(value).format('DD-MMM-YYYY') !== 'Invalid date';
    errorHandler('dateOfBirth', dateErrors, 'Date is invalid');
  };

  const handleBvnChange = (e: ChangeEvent<HTMLInputElement>): void | null => {
    const {
      target: { value },
    } = e;
    if (value.match(/^[0-9]+$/) || value === '') {
      setBvn(value);
      const bvnErrors = bvnSchema.validate(value);
      errorHandler('bvn', bvnErrors, 'Bvn is invalid');
    }
    return;
  };

  const handlePINChange = (value: string) => {
    setPin(value);
    const pinErrors = value.length === 4;
    errorHandler('pin', pinErrors, 'PIN is invalid');
  };

  useEffect(() => {
    if (validateForm(errors)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errors]);

  const handleBVNVerification: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setInputDisabled(true);

    dispatch(
      createWallet(
        { dateOfBirth: moment(dateOfBirth).format('DD-MMM-YYYY'), pin, bvn },
        () => history.push(location?.state ? location?.state?.from : ROUTE_URLS.DASHBOARD_URL),
        () => {
          setInputDisabled(false);
          setBvn('');
          setPin('');
          setDateOfBirth('');
        },
      ),
    );
  };

  return (
    <section className="kyc">
      <InnerPageNavBar pageLogoComponent={true} goBackrouteName={locationState ? locationState.from : '/'} />

      <form className="kyc-form">
        <h1 className="title">Create Wallet</h1>
        <div className="form-section">
          <Input
            type="date"
            id="dob"
            name="dob"
            label="Date OF Birth"
            value={dateOfBirth}
            disabled={inputDisabled}
            onInputChange={handleDOBChange}
            required={true}
          />
          <Input
            type="tel"
            id="bvn"
            name="bvn"
            label="Bank verification number (BVN)"
            placeholder="0000******0"
            value={bvn}
            disabled={inputDisabled}
            onInputChange={handleBvnChange}
            required={true}
          />
          <PINInput label="PIN" id="pin" length={4} onChange={handlePINChange} disabled={inputDisabled} type="custom" />

          <p className="subtitle pin">
            Keep your Awabah wallet secure with a 4-digit PIN. Ensure your PIN is memorable and avoid obvious numbers.
            You can update your PIN in the settings page.
          </p>

          <div className="submit-btn-section">
            {isLoading ? (
              <button type="button" className="btn submit-btn disabled" onClick={() => null} disabled={true}>
                <i className="fas fa-circle-notch fa-pulse" />
              </button>
            ) : (
              <button
                className={`btn submit-btn${disabled === true ? ` disabled` : ``}`}
                type="button"
                disabled={disabled}
                onClick={handleBVNVerification}
              >
                Save PIN
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateWallet;
