import React from 'react';

interface UserCard {
  cardTypeLogo: string;
  cardNumber: string;
  bankName: string;
}

interface SavedCardInfoPropsTypes {
  card: UserCard;
}

const SavedCardInfo = ({ card }: SavedCardInfoPropsTypes): JSX.Element => {
  return (
    <div className="saved-card-info info">
      <div className="bank-logo">
        <img src={card.cardTypeLogo} alt="" />
      </div>
      <div className="details">
        <p className="bank-name">{card.bankName}</p>
        <p className="account-number"> &nbsp;(**{card.cardNumber.slice(-4)})</p>
      </div>
    </div>
  );
};

export default SavedCardInfo;
