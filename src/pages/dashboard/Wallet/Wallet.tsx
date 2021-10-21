import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/** Component(s) */
import DashboardLayout from '../../../layouts/DashboardLayout';
import TransactionHistoryTable from '../../../components/transactionHistoryTable';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';

const Wallet = (): JSX.Element => {
  const location = useLocation();

  return (
    <DashboardLayout routeName={location.pathname}>
      <div className="module wallet">
        <h1 className="module-title">Wallet</h1>
        <section className="balance-section">
          <div className="card wallet-balance">
            <main className="card-body">
              <div className="info">
                <p className="title">Wallet Balance</p>
                <p className="value">&#x20A6;0.00</p>
              </div>
              <div className="card-button-section">
                <Link
                  to={{
                    pathname: ROUTE_URLS.TRANSFER_MONEY,
                    state: { from: location.pathname },
                  }}
                  className="add-money-link"
                >
                  <button className="btn">
                    <span>
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.4996 3.59998C12.8179 3.59998 13.1231 3.7264 13.3481 3.95145C13.5732 4.17649 13.6996 4.48172 13.6996 4.79998V10.8H19.6996C20.0179 10.8 20.3231 10.9264 20.5481 11.1514C20.7732 11.3765 20.8996 11.6817 20.8996 12C20.8996 12.3182 20.7732 12.6235 20.5481 12.8485C20.3231 13.0735 20.0179 13.2 19.6996 13.2H13.6996V19.2C13.6996 19.5182 13.5732 19.8235 13.3481 20.0485C13.1231 20.2735 12.8179 20.4 12.4996 20.4C12.1813 20.4 11.8761 20.2735 11.6511 20.0485C11.426 19.8235 11.2996 19.5182 11.2996 19.2V13.2H5.29961C4.98135 13.2 4.67612 13.0735 4.45108 12.8485C4.22604 12.6235 4.09961 12.3182 4.09961 12C4.09961 11.6817 4.22604 11.3765 4.45108 11.1514C4.67612 10.9264 4.98135 10.8 5.29961 10.8H11.2996V4.79998C11.2996 4.48172 11.426 4.17649 11.6511 3.95145C11.8761 3.7264 12.1813 3.59998 12.4996 3.59998Z"
                          fill="#3D663D"
                        />
                      </svg>
                    </span>{' '}
                    Transfer money
                  </button>
                </Link>
              </div>
            </main>
          </div>
        </section>

        <section className="information-section">
          <TransactionHistoryTable />
          <section className="account-cards-section">
            <div className="accounts-section card">
              <header className="accounts-section-header">
                <h2 className="section-title">Account Information</h2>
                <button className="btn icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.66634 13.3335H4.99967C4.55765 13.3335 4.13372 13.1579 3.82116 12.8453C3.5086 12.5328 3.33301 12.1089 3.33301 11.6668V5.00016C3.33301 4.55814 3.5086 4.13421 3.82116 3.82165C4.13372 3.50909 4.55765 3.3335 4.99967 3.3335H11.6663C12.1084 3.3335 12.5323 3.50909 12.8449 3.82165C13.1574 4.13421 13.333 4.55814 13.333 5.00016V6.66683M8.33301 16.6668H14.9997C15.4417 16.6668 15.8656 16.4912 16.1782 16.1787C16.4907 15.8661 16.6663 15.4422 16.6663 15.0002V8.3335C16.6663 7.89147 16.4907 7.46755 16.1782 7.15498C15.8656 6.84242 15.4417 6.66683 14.9997 6.66683H8.33301C7.89098 6.66683 7.46706 6.84242 7.1545 7.15498C6.84194 7.46755 6.66634 7.89147 6.66634 8.3335V15.0002C6.66634 15.4422 6.84194 15.8661 7.1545 16.1787C7.46706 16.4912 7.89098 16.6668 8.33301 16.6668Z"
                      stroke="#3D663D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </header>
              <div className="card-body">
                <p className="details">Top up your Awabah wallet directly from your other bank accounts</p>
                <div className="info-pairs">
                  <p className="info-title">Account name</p>
                  <p className="info-value">Olatunji Ugoh Andrews</p>
                </div>
                <div className="info-pairs">
                  <p className="info-title">Bank name</p>
                  <p className="info-value">VBank</p>
                </div>
                <div className="info-pairs">
                  <p className="info-title">Account number</p>
                  <p className="info-value">12345678901</p>
                </div>
              </div>
            </div>

            <div className="cards-section card">
              <div className="view-saved-cards">View saved cards</div>
              <div className="view-saved-beneficiaries">View saved beneficiaries</div>
            </div>
          </section>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
