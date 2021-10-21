import React, { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';

/** Component(s) */
import InnerPageNavBar from '../../../components/navbar/InnerPageNavBar';
import Input from '../../../components/input/Input';
import RadioInput from '../../../components/input/RadioInput';
import PINInput from '../../../components/input/PINInput';
import SavedBankInfo from '../../../components/saved-bank-info/SavedBankInfo';

/** Image(s) */
import BankLogo from '../../../assets/icons/bankLogo.svg';
import InfoIcon from '../../../assets/icons/info.svg';
import ResendIcon from '../../../assets/icons/ResendIcon.svg';

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
  bankLogo: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  checked: boolean;
  value: string;
  label: string;
  id: string;
}

const WithdrawMoney = (): JSX.Element => {
  const [transferAmount, setTransferAmount] = useState<number | string | undefined>();
  const [transferToOptions, setTransferToOptions] = useState<TransferOptionsProps[]>([
    {
      label: 'Awabah wallet',
      id: 'awabahWallet',
      value: 'awabahWallet',
      checked: true,
    },
    {
      label: 'Bank account',
      id: 'bankAccount',
      value: 'bankAccount',
      checked: false,
    },
  ]);
  const [bankAccounts, setBankAccounts] = useState<BankAccountsProps[]>([
    {
      bankLogo: BankLogo,
      accountName: 'Jeremy Bankole',
      accountNumber: '0122020202',
      bankName: 'GTBank',
      label: 'Jeremy Bankole',
      id: '0122020202',
      value: '0122020202',
      checked: true,
    },
    {
      bankLogo: BankLogo,
      accountName: 'Adeniran Adetobi',
      accountNumber: '398528405',
      bankName: 'GTBank',
      label: 'Adeniran Adetobi',
      id: '398528405',
      value: '398528405',
      checked: false,
    },
    {
      bankLogo: BankLogo,
      accountName: 'Oscar Olayemi',
      accountNumber: '50294943219',
      bankName: 'GTBank',
      label: 'Oscar Olayemi',
      id: '50294943219',
      value: '50294943219',
      checked: false,
    },
  ]);
  const [showAmountForm, setShowAmountForm] = useState<boolean>(true);
  const [showPinForm, setshowPinForm] = useState<boolean>(false);
  const [showBankAccountForm, setShowBankAccountForm] = useState<boolean>(false);
  const [lastLocation, setLastLocation] = useState<string>('');

  const location: Location = useLocation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setTransferAmount(e.target.value);
  };

  const handleRadioSelect = (e: ChangeEvent<HTMLInputElement>, optsArray: any, callback: (opts: any) => void) => {
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

  const handleTransferTypeSelect = (e: ChangeEvent<HTMLInputElement>) => {
    handleRadioSelect(e, transferToOptions, (opsArray) => setTransferToOptions(opsArray));
  };

  const handleBankAccountSelect = (e: ChangeEvent<HTMLInputElement>) => {
    handleRadioSelect(e, bankAccounts, (opsArray) => setBankAccounts(opsArray));
  };

  const handleAmountFormSubmit = (): void => {
    if (transferAmount && transferToOptions.find((opt) => opt.checked === true && opt.value === 'awabahWallet')) {
      setShowAmountForm(false);
      setLastLocation('amountForm');
      return setshowPinForm(true);
    }
    if (transferAmount && transferToOptions.find((opt) => opt.checked === true && opt.value === 'bankAccount')) {
      setShowAmountForm(false);
      setLastLocation('amountForm');
      return setShowBankAccountForm(true);
    }

    return;
  };

  const renderCustomLabel = (customOption: any): JSX.Element => {
    return (
      <SavedBankInfo
        account={{
          bankLogo: customOption.bankLogo,
          accountName: customOption.accountName,
          accountNumber: customOption.accountNumber,
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
    <section className="withdraw-money-section">
      <InnerPageNavBar
        pageTitle="Withdraw Money"
        goBackrouteName={location?.state ? location?.state?.from : ROUTE_URLS.MICRO_PENSION}
      />
      <section className="transfer-activity-card">
        <p className="transfer-activity-card-title">Enter transfer details</p>
        {showAmountForm && (
          <form className="amount-transfer-form">
            <section className="saving-prompt-section">
              <img width="" src={InfoIcon} alt="Info-icon" className="icon" />
              <p className="text">
                Note that withdrawal requests can take up to 48hrs. You have ₦40,000 available for withdrawal.
              </p>
            </section>
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
              <p className="form-label">Withdraw to</p>
              <p className="form-label-subtitle">This is where the withdrawn amount will be credited to</p>
              <RadioInput options={transferToOptions} name="transferTo" handleRadioSelect={handleTransferTypeSelect} />
            </div>

            <div className="submit-btn-section">
              <button className="btn submit-btn disabled" type="button" onClick={() => handleAmountFormSubmit()}>
                Next
              </button>
            </div>
          </form>
        )}
        {showPinForm && (
          <form className="pin-form">
            <div className="form-control-group">
              <p className="form-label-subtitle">
                Enter the OTP sent to your registered phone number +234809*****99 to verify this transaction
              </p>
              <PINInput label="OTP" id="otp" length={6} />
              <p className="wallet-balance-amount">
                Wallet balance:
                <span className="value">N12,024.94</span>
              </p>
            </div>

            <div className="submit-btn-section">
              <button className="btn resend-btn" type="button">
                <img width="" src={ResendIcon} alt="resend-icon" className="icon" />
                Resend OTP
              </button>
              <div className="bottom-btns">
                <button className="btn cancel-btn" type="button" onClick={() => handlePinFormG0Back()}>
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
              <p className="form-label">Select a bank account to transfer money to</p>
              <RadioInput
                customLabel={renderCustomLabel}
                options={bankAccounts}
                name="transferTo"
                handleRadioSelect={handleBankAccountSelect}
              />
            </div>

            <div className="submit-btn-section">
              <button className="btn cancel-btn" type="button" onClick={() => goBack(lastLocation)}>
                Cancel
              </button>
              <button className="btn submit-btn disabled" type="button" onClick={() => handleBankAccountSelection()}>
                Next
              </button>
            </div>
          </form>
        )}
      </section>
    </section>
  );
};

export default WithdrawMoney;
