import React from 'react';

interface UserAccount {
  bankLogo: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
}
interface SavedBankInfoPropsTypes {
  account: UserAccount;
}

const SavedBankInfo = ({ account }: SavedBankInfoPropsTypes): JSX.Element => {
  return (
    <div className="saved-bank-info info">
      <div className="bank-logo">
        <img src={account.bankLogo} alt="" />
      </div>
      <div className="details">
        <p className="account-name">{account.accountName}</p>
        <p className="account-number">{account.accountNumber}</p>
        <p className="bank-name">{account.bankName}</p>
      </div>
    </div>
  );
};

export default SavedBankInfo;
