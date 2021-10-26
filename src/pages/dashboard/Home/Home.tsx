import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/** Components */
import Modal from '../../../components/modals/Modal';
import TransactionHistoryTable from '../../../components/transactionHistoryTable';
import DashboardLayout from '../../../layouts/DashboardLayout';

/** Icons */
import InfoIcon from '../../../assets/icons/info.svg';
import OpenPensionAccountIcon from '../../../assets/icons/openPensionAccountIcon.svg';

/** Utils */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Type(s) */
import { RootState } from '../../../store/rootReducer';
import { User } from '../../../@types/user.type';

const Home = (): JSX.Element => {
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [hasPencom, setHasPencom] = useState<boolean>();
  const [userDetails, setUserDetails] = useState<User | Record<string, any>>(
    {},
  );

  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  useEffect(() => {
    setUserDetails(user);
    if (user?.pencoms && user?.pencoms.length > 0) {
      setHasPencom(true);
    }
  }, [user]);

  const getFirstName = () =>
    userDetails?.firstName &&
    userDetails?.firstName.replace(
      userDetails?.firstName[0],
      userDetails?.firstName[0].toUpperCase(),
    );

  return (
    <DashboardLayout routeName={location.pathname}>
      {Object.keys(userDetails).length > 0 && (
        <div className="module home">
          <Modal isOpen={isModalOpen} closeModal={() => setIsOpenModal(false)}>
            <div className="child-modal-content">
              <img
                src={OpenPensionAccountIcon}
                alt="Coin Icon"
                className="modal-primary-icon"
              />
              <h4 className="modal-title">Open a Micro Pension account</h4>
              <p className="details">
                Open a Micro Pension account now to start saving for your
                future. Get a PENCOM number instantly and start saving!
              </p>
              <Link
                to={{
                  pathname: ROUTE_URLS.CREATE_PENCOM_ACCOUNT,
                  state: { from: location.pathname },
                }}
                className="modal-link"
              >
                <button className="btn modal-link-btn">
                  Open a Micro Pension account
                </button>
              </Link>
            </div>
          </Modal>
          <h1 className="module-title">
            Hello, {getFirstName()}
            <span className="emoji" role="img" aria-label="hand-emoji">
              &#128075;&#127999;
            </span>
          </h1>
          {!hasPencom && (
            <section className="saving-prompt-section">
              <img width="" src={InfoIcon} alt="Info-icon" className="icon" />
              <p className="text">
                Start saving for your future. &nbsp;
                <button
                  type="button"
                  onClick={() => setIsOpenModal(true)}
                  className="modal-trigger"
                >
                  Open a Micro Pension account now.
                </button>
              </p>
            </section>
          )}
          <section className="balance-section">
            <div className="card pension-balance">
              <main className="card-body">
                <div className="card-button-section">
                  <Link
                    to={{
                      pathname: ROUTE_URLS.ADD_MONEY,
                      state: { from: location.pathname },
                    }}
                    className="add-money-link"
                  >
                    <button className="btn" disabled={!hasPencom}>
                      &#43; Add money
                    </button>
                  </Link>
                </div>
                <div className="info">
                  <p className="title">Total Pension Balance</p>
                  <p className="value">&#x20A6;0.00</p>
                </div>
              </main>
              <footer className="card-footer">
                <small className="title">Available to withdraw</small>
                <small className="value">&#8358;0.00</small>
              </footer>
            </div>
            <div className="card wallet-balance">
              <main className="card-body">
                <div className="info">
                  <p className="title">Wallet Balance</p>
                  <p className="value">&#x20A6;0.00</p>
                </div>
              </main>
            </div>
          </section>
          <TransactionHistoryTable />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Home;
