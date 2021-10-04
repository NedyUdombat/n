import React, { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';

/** Component(s) */
import InnerPageNavBar from '../../../components/navbar/InnerPageNavBar';
import Input from '../../../components/input/Input';
import RadioInput from '../../../components/input/RadioInput';
import PINInput from '../../../components/input/PINInput';
import SavedCardInfo from '../../../components/saved-card-info/SavedCardInfo';

/** Image(s) */
import ResendIcon from '../../../assets/icons/ResendIcon.svg';
import VerveLogo from '../../../assets/icons/verveLogo.svg';
import MastercardLogo from '../../../assets/icons/mastercardLogo.svg';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Types(s) */
import { Location } from '../../../@types/router.type';

interface TransferOptionsProps {
  label: string;
  id: string;
  value: string;
  checked: boolean;
}

interface BankAccountsProps {
  cardTypeLogo: string;
  cardNumber: string;
  bankName: string;
  checked: boolean;
  value: string;
  label: string;
  id: string;
}

const AddMoney = (): JSX.Element => {
  const [transferAmount, setTransferAmount] = useState<
    number | string | undefined
  >();
  const [transferToOptions, setTransferToOptions] = useState<
    TransferOptionsProps[]
  >([
    {
      label: 'Pay with Awabah wallet',
      id: 'awabahWallet',
      value: 'awabahWallet',
      checked: true,
    },
    { label: 'Pay with Card', id: 'card', value: 'card', checked: false },
  ]);
  const [bankCards, setBankCards] = useState<BankAccountsProps[]>([
    {
      cardTypeLogo: VerveLogo,
      cardNumber: '1837635019283572',
      bankName: 'Guaranty Trust Bank',
      label: 'Jeremy Bankole',
      id: '1837635019283572',
      value: '1837635019283572',
      checked: true,
    },
    {
      cardTypeLogo: MastercardLogo,
      cardNumber: '30982712973205',
      bankName: 'Fidelity Bank',
      label: 'Adeniran Adetobi',
      id: '30982712973205',
      value: '30982712973205',
      checked: false,
    },
    {
      cardTypeLogo: MastercardLogo,
      cardNumber: '5039612943267545',
      bankName: 'Zenith Bank',
      label: 'Oscar Olayemi',
      id: '5039612943267545',
      value: '5039612943267545',
      checked: false,
    },
    {
      cardTypeLogo: VerveLogo,
      cardNumber: '50098232849531',
      bankName: 'GTBank',
      label: 'United Bank of Africa',
      id: '50098232849531',
      value: '50098232849531',
      checked: false,
    },
    {
      cardTypeLogo: '',
      cardNumber: '',
      bankName: '',
      label: 'United Bank of Africa',
      id: 'newCard',
      value: 'newCard',
      checked: false,
    },
  ]);
  const [showAmountForm, setShowAmountForm] = useState<boolean>(true);
  const [showPinForm, setshowPinForm] = useState<boolean>(false);
  const [showBankAccountForm, setShowBankAccountForm] =
    useState<boolean>(false);
  const [lastLocation, setLastLocation] = useState<string>('');

  const location: Location = useLocation();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setTransferAmount(e.target.value);
  };

  const handleRadioSelect = (
    e: ChangeEvent<HTMLInputElement>,
    optsArray: any,
    callback: (opts: any) => void,
  ) => {
    const checkedOption = optsArray.find((opt: any) => opt.checked === true);
    const newOptsArray = optsArray.map((option: any) => {
      if (option.value === checkedOption?.value) {
        option.checked = false;
      }
      if (option.value === e.target.value) {
        option.checked = true;
      }

      return option;
    });

    callback(newOptsArray);
  };

  const handleAccordionState = () => {
    const checkedOption = bankCards.find((opt: any) => opt.checked === true);
    const newOptsArray = bankCards.map((option: any) => {
      if (option.value === checkedOption?.value) {
        option.checked = false;
      }
      if (option.value === 'newCard') {
        option.checked = true;
      }

      return option;
    });

    setBankCards(newOptsArray);
  };

  const handleTransferTypeSelect = (e: ChangeEvent<HTMLInputElement>) => {
    handleRadioSelect(e, transferToOptions, (opsArray) =>
      setTransferToOptions(opsArray),
    );
  };

  const handleBankAccountSelect = (e: ChangeEvent<HTMLInputElement>) => {
    handleRadioSelect(e, bankCards, (opsArray) => setBankCards(opsArray));
  };

  const handleAmountFormSubmit = (): void => {
    if (
      transferAmount &&
      transferToOptions.find(
        (opt) => opt.checked === true && opt.value === 'awabahWallet',
      )
    ) {
      setShowAmountForm(false);
      setLastLocation('amountForm');
      return setshowPinForm(true);
    }
    if (
      transferAmount &&
      transferToOptions.find(
        (opt) => opt.checked === true && opt.value === 'card',
      )
    ) {
      setShowAmountForm(false);
      setLastLocation('amountForm');
      return setShowBankAccountForm(true);
    }

    return;
  };

  const renderCustomLabel = (customOption: any): JSX.Element => {
    if (customOption.value === 'newCard') {
      return (
        <div className="accordion add-new-card" id="addNewCard">
          <div className="add-new-label">
            <button
              className="btn text-black"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              id="headingOne"
              onClick={() => handleAccordionState()}
            >
              Collapsible Group Item #1
            </button>

            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#addNewCard"
            >
              <div className="card-body">Some place</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <SavedCardInfo
        card={{
          cardTypeLogo: customOption.cardTypeLogo,
          cardNumber: customOption.cardNumber,
          bankName: customOption.bankName,
        }}
      />
    );
  };

  const handleBankAccountSelection = (): void => {
    setLastLocation('bankSelectForm');
    setShowBankAccountForm(false);
    return setshowPinForm(true);
  };

  const goBack = (lastRoute: string) => {
    if (lastRoute === 'amountForm') {
      setshowPinForm(false);
      setShowBankAccountForm(false);
      setShowAmountForm(true);
    } else if (lastRoute === 'bankSelectForm') {
      setshowPinForm(false);
      setShowAmountForm(false);
      setShowBankAccountForm(true);
    }
  };

  const handlePinFormG0Back = () => {
    setLastLocation('amountForm');
    goBack(lastLocation);
  };

  return (
    <section className="add-money-section">
      <InnerPageNavBar
        pageTitle="Add Money"
        goBackrouteName={
          location?.state ? location?.state?.from : ROUTE_URLS.DASHBOARD_URL
        }
      />
      <section className="transfer-activity-card">
        <p className="transfer-activity-card-title">Enter transfer details</p>
        {showAmountForm && (
          <form className="amount-transfer-form">
            <Input
              type="number"
              id="transferAmount"
              name="transferAmount"
              label="Amount"
              placeholder="2000"
              value={transferAmount}
              disabled={false}
              onInputChange={handleInputChange}
              required={true}
            />

            <div className="form-control-group transfer-location">
              <p className="form-label">Payment method</p>
              <RadioInput
                options={transferToOptions}
                name="transferTo"
                handleRadioSelect={handleTransferTypeSelect}
              />
            </div>

            <div className="submit-btn-section">
              <button
                className="btn submit-btn disabled"
                type="button"
                onClick={() => handleAmountFormSubmit()}
              >
                Next
              </button>
            </div>
          </form>
        )}
        {showPinForm && (
          <form className="pin-form">
            <div className="form-control-group">
              <p className="form-label-subtitle">
                Enter the OTP sent to your registered phone number
                +234809*****99 to verify this transaction
              </p>
              <PINInput label="OTP" id="otp" length={6} />
              <p className="wallet-balance-amount">
                Wallet balance:
                <span className="value">N12,024.94</span>
              </p>
            </div>

            <div className="submit-btn-section">
              <button className="btn resend-btn" type="button">
                <img
                  width=""
                  src={ResendIcon}
                  alt="resend-icon"
                  className="icon"
                />
                Resend OTP
              </button>
              <div className="bottom-btns">
                <button
                  className="btn cancel-btn"
                  type="button"
                  onClick={() => handlePinFormG0Back()}
                >
                  Cancel
                </button>
                <button className="btn submit-btn disabled" type="button">
                  Withdraw money
                </button>
              </div>
            </div>
          </form>
        )}
        {showBankAccountForm && (
          <form className="bank-detials-form">
            <div className="form-control-group transfer-location">
              <p className="form-label">
                Select a bank account to transfer money to
              </p>
              <RadioInput
                customLabel={renderCustomLabel}
                options={bankCards}
                name="transferTo"
                handleRadioSelect={handleBankAccountSelect}
              />
            </div>

            <div className="submit-btn-section">
              <button
                className="btn cancel-btn"
                type="button"
                onClick={() => goBack(lastLocation)}
              >
                Cancel
              </button>
              <button
                className="btn submit-btn disabled"
                type="button"
                onClick={() => handleBankAccountSelection()}
              >
                Next
              </button>
            </div>
          </form>
        )}
      </section>
    </section>
  );
};

export default AddMoney;
