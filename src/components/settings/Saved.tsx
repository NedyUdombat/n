import React, { useState } from 'react';

/** Component(s) */
import Divider from '../divider';
import Modal from '../modals/Modal';
import SavedBankInfo from '../saved-bank-info/SavedBankInfo';
import SavedCardInfo from '../saved-card-info/SavedCardInfo';

/** Image(s) */
import BankLogo from '../../assets/icons/bankLogo.svg';
import VerveLogo from '../../assets/icons/verveLogo.svg';
import MastercardLogo from '../../assets/icons/mastercardLogo.svg';

interface UserAccount {
  bankLogo: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
}

interface UserCard {
  cardTypeLogo: string;
  cardNumber: string;
  bankName: string;
}

const Saved = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const savedAccounts: UserAccount[] = [
    {
      bankLogo: BankLogo,
      accountName: 'Jeremy Bankole',
      accountNumber: '0122020202',
      bankName: 'GTBank',
    },
    {
      bankLogo: BankLogo,
      accountName: 'Jeremy Bankole',
      accountNumber: '398528405',
      bankName: 'GTBank',
    },
    {
      bankLogo: BankLogo,
      accountName: 'Jeremy Bankole',
      accountNumber: '50294943219',
      bankName: 'GTBank',
    },
  ];

  const savedCards: UserCard[] = [
    {
      cardTypeLogo: VerveLogo,
      cardNumber: '0122020202',
      bankName: 'Guaranty Trust Bank',
    },
    {
      cardTypeLogo: MastercardLogo,
      cardNumber: '398528405',
      bankName: 'Fidelity Bank',
    },
    {
      cardTypeLogo: VerveLogo,
      cardNumber: '50294943219',
      bankName: 'Zenith Bank',
    },
    {
      cardTypeLogo: MastercardLogo,
      cardNumber: '1039284024',
      bankName: 'United Bank of Africa',
    },
  ];

  const renderModal = (): JSX.Element => {
    return <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />;
  };

  return (
    <div className="saved-section">
      {renderModal()}

      <section className="saved-banks">
        <p className="saved-section-title">Saved banks</p>
        {savedAccounts.length > 0 &&
          savedAccounts.map((account) => (
            <div className="saved-bank-card" key={account.accountNumber}>
              <SavedBankInfo account={account} />
              <div>
                <button type="button" className="btn remove-btn">
                  Remove
                </button>
              </div>
            </div>
          ))}
      </section>
      <Divider />
      <section className="saved-cards">
        <p className="saved-section-title">Saved cards</p>
        {savedCards.length > 0 &&
          savedCards.map((card) => (
            <div className="bank-card" key={card.cardNumber}>
              <SavedCardInfo card={card} />
              <div>
                <button type="button" className="btn remove-btn">
                  Remove
                </button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Saved;
