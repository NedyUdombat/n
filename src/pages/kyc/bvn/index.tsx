import React, {
  useEffect,
  useState,
  ChangeEvent,
  MouseEventHandler,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

/** Component(s) */
import InnerPageNavBar from '../../../components/navbar/InnerPageNavBar';
import Input from '../../../components/input/Input';
import Modal from '../../../components/modals/Modal';

/** Icon(s) */
import UserIcon from '../../../assets/icons/userIcon.svg';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';
import { ErrorsType } from '../../../@types/error.type';

/** Action(s) */
import { verifyBvn } from '../../../store/modules/bvn';
import { singleNameSchema, bvnSchema } from '../../../utils/validators';

interface KYCPropsTypes {
  location: { state: { from: string } };
}

const validateForm = (errors: ErrorsType) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== 'valid' && (valid = false));
  return valid;
};

const Index = ({
  location: { state: locationState },
}: KYCPropsTypes): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [bvn, setBvn] = useState<string>('');
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({
    firstname: null,
    lastname: null,
    bvn: null,
  });

  const isLoading = useSelector((state: RootState) => state.bvn.isLoading);
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

  const handleFirstNameChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void | null => {
    const {
      target: { value },
    } = e;
    setFirstName(value);
    const nameErrors = singleNameSchema.validate(value);
    errorHandler('firstname', nameErrors, 'First Name is invalid');
  };

  const handleLastNameChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void | null => {
    const {
      target: { value },
    } = e;
    setLastName(value);
    const nameErrors = singleNameSchema.validate(value);
    errorHandler('lastname', nameErrors, 'Last Name is invalid');
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

    dispatch(verifyBvn({ firstName, lastName, bvn }, history));
    setInputDisabled(false);
  };

  return (
    <section className="kyc">
      <Modal isOpen={isModalOpen} closeModal={() => setIsOpenModal(false)}>
        <div className="child-modal-content">
          <img src={UserIcon} alt="Coin Icon" className="modal-primary-icon" />
          <p className="details">
            We need your BVN to verify your identity. Your BVN does not give
            Awabah access to your bank accounts.
          </p>
        </div>
      </Modal>
      <InnerPageNavBar
        pageLogoComponent={true}
        goBackrouteName={locationState ? locationState.from : '/'}
      />

      <form className="kyc-form">
        <h1 className="title">Welcome to Awabah</h1>
        <p className="subtitle">
          Please provide a few details to help us verify your identity. Your
          information will be kept secure.
        </p>
        <div className="form-section">
          <button
            className="info-modal modal-trigger"
            type="button"
            onClick={() => setIsOpenModal(true)}
          >
            Why we need your BVN
          </button>

          <Input
            type="text"
            id="firstname"
            name="firstname"
            label="FirstName"
            placeholder="First name"
            value={firstName}
            disabled={inputDisabled}
            onInputChange={handleFirstNameChange}
            required={true}
          />
          <Input
            type="text"
            id="lastnane"
            name="lastnane"
            label="Last Name"
            placeholder="Last name"
            value={lastName}
            disabled={inputDisabled}
            onInputChange={handleLastNameChange}
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
          <p className="info">
            Dial *565*0# on your registered mobile number to get your BVN
          </p>

          <div className="submit-btn-section">
            {isLoading ? (
              <button
                type="button"
                className="btn submit-btn disabled"
                onClick={() => null}
                disabled={true}
              >
                <i className="fas fa-circle-notch fa-pulse" />
              </button>
            ) : (
              <button
                className={`btn submit-btn${
                  disabled === true ? ` disabled` : ``
                }`}
                type="button"
                disabled={disabled}
                onClick={handleBVNVerification}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Index;
