import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/** Component(s) */
import DashboardLayout from '../../../layouts/DashboardLayout';
import TransactionHistoryTable from '../../../components/transactionHistoryTable';
import Modal from '../../../components/modals/Modal';

/** Icons */
import InfoIcon from '../../../assets/icons/info.svg';
import OpenPensionAccountIcon from '../../../assets/icons/openPensionAccountIcon.svg';

/** Util(s) */
import { ROUTE_URLS } from '../../../routes/RouteUrls';
import { RootState } from '../../../store/rootReducer';

const Micro = (): JSX.Element => {
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [hasPencom, setHasPencom] = useState<boolean>();

  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();

  useEffect(() => {
    if (Object.keys(user).length > 1) {
      user?.pencoms.length > 0 ? setHasPencom(true) : setHasPencom(false);
    }
  }, [user]);

  console.log('userDetails.pencoms', user?.pencoms);
  console.log('hasPencom', hasPencom);

  return (
    <DashboardLayout routeName={location.pathname}>
      <div className="module micro">
        <Modal isOpen={isModalOpen} closeModal={() => setIsOpenModal(false)}>
          <div className="child-modal-content">
            <img
              src={OpenPensionAccountIcon}
              alt="Coin Icon"
              className="modal-primary-icon"
            />
            <h4 className="modal-title">Open a Micro Pension account</h4>
            <p className="details">
              Open a Micro Pension account now to start saving for your future.
              Get a PENCOM number instantly and start saving!
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
        <h1 className="module-title">Micro Pension</h1>
        {hasPencom !== undefined && (
          <div>
            {hasPencom === false ? (
              <section className="not-created-section card">
                <img
                  src={OpenPensionAccountIcon}
                  alt="warning Icon"
                  className="warning-icon"
                />
                <p className="info">
                  You do not currently have a Micro Pension account, please
                  click on the button below to create one and start saving for
                  your future.
                </p>

                <div className="card-button-section">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsOpenModal(true)}
                  >
                    Open a Micro Pension account now
                  </button>
                </div>
              </section>
            ) : (
              <>
                <section className="balance-section">
                  <div className="card pension-balance">
                    <main className="card-body">
                      <div className="info">
                        <p className="title">Total Pension Balance</p>
                        <p className="value">&#x20A6;0.00</p>
                      </div>
                      <div className="card-button-section">
                        <Link
                          to={{
                            pathname: ROUTE_URLS.ADD_MONEY,
                            state: { from: location.pathname },
                          }}
                          className="add-money-link"
                        >
                          <button className="btn" disabled={!hasPencom}>
                            <span>
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.4996 3.59998C12.8179 3.59998 13.1231 3.7264 13.3481 3.95145C13.5732 4.17649 13.6996 4.48172 13.6996 4.79998V10.8H19.6996C20.0179 10.8 20.3231 10.9264 20.5481 11.1514C20.7732 11.3765 20.8996 11.6817 20.8996 12C20.8996 12.3182 20.7732 12.6235 20.5481 12.8485C20.3231 13.0735 20.0179 13.2 19.6996 13.2H13.6996V19.2C13.6996 19.5182 13.5732 19.8235 13.3481 20.0485C13.1231 20.2735 12.8179 20.4 12.4996 20.4C12.1813 20.4 11.8761 20.2735 11.6511 20.0485C11.426 19.8235 11.2996 19.5182 11.2996 19.2V13.2H5.29961C4.98135 13.2 4.67612 13.0735 4.45108 12.8485C4.22604 12.6235 4.09961 12.3182 4.09961 12C4.09961 11.6817 4.22604 11.3765 4.45108 11.1514C4.67612 10.9264 4.98135 10.8 5.29961 10.8H11.2996V4.79998C11.2996 4.48172 11.426 4.17649 11.6511 3.95145C11.8761 3.7264 12.1813 3.59998 12.4996 3.59998Z"
                                  fill="#3D663D"
                                />
                              </svg>
                            </span>{' '}
                            Add money
                          </button>
                        </Link>
                      </div>
                    </main>
                  </div>
                  <div className="card wallet-balance">
                    <main className="card-body">
                      <div className="info">
                        <p className="title">
                          Available to withdraw
                          <span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.3996 7.99998C14.3996 9.69736 13.7253 11.3252 12.5251 12.5255C11.3249 13.7257 9.69699 14.4 7.99961 14.4C6.30222 14.4 4.67436 13.7257 3.47413 12.5255C2.27389 11.3252 1.59961 9.69736 1.59961 7.99998C1.59961 6.30259 2.27389 4.67472 3.47413 3.47449C4.67436 2.27426 6.30222 1.59998 7.99961 1.59998C9.69699 1.59998 11.3249 2.27426 12.5251 3.47449C13.7253 4.67472 14.3996 6.30259 14.3996 7.99998ZM7.99961 5.59998C7.85905 5.59984 7.72093 5.63674 7.59917 5.70696C7.4774 5.77718 7.37629 5.87825 7.30601 5.99998C7.25526 6.09428 7.1861 6.17743 7.10262 6.2445C7.01914 6.31158 6.92304 6.36121 6.82002 6.39046C6.71701 6.4197 6.60916 6.42797 6.50289 6.41476C6.39662 6.40156 6.29408 6.36715 6.20136 6.31358C6.10863 6.26002 6.0276 6.18837 5.96307 6.10291C5.89855 6.01744 5.85184 5.91989 5.82571 5.81604C5.79959 5.71219 5.79458 5.60415 5.81098 5.49832C5.82738 5.3925 5.86487 5.29104 5.92121 5.19998C6.18538 4.74247 6.59314 4.3849 7.08123 4.18275C7.56932 3.98059 8.11048 3.94512 8.62078 4.08186C9.13108 4.2186 9.58201 4.51989 9.90363 4.93901C10.2252 5.35814 10.3996 5.87167 10.3996 6.39998C10.3998 6.89647 10.246 7.3808 9.95942 7.78626C9.67287 8.19172 9.26767 8.49837 8.79961 8.66398V8.79998C8.79961 9.01215 8.71532 9.21563 8.56529 9.36566C8.41527 9.51569 8.21178 9.59998 7.99961 9.59998C7.78744 9.59998 7.58395 9.51569 7.43392 9.36566C7.28389 9.21563 7.19961 9.01215 7.19961 8.79998V7.99998C7.19961 7.7878 7.28389 7.58432 7.43392 7.43429C7.58395 7.28426 7.78744 7.19998 7.99961 7.19998C8.21178 7.19998 8.41527 7.11569 8.56529 6.96566C8.71532 6.81563 8.79961 6.61215 8.79961 6.39998C8.79961 6.1878 8.71532 5.98432 8.56529 5.83429C8.41527 5.68426 8.21178 5.59998 7.99961 5.59998ZM7.99961 12C8.21178 12 8.41527 11.9157 8.56529 11.7657C8.71532 11.6156 8.79961 11.4121 8.79961 11.2C8.79961 10.9878 8.71532 10.7843 8.56529 10.6343C8.41527 10.4843 8.21178 10.4 7.99961 10.4C7.78744 10.4 7.58395 10.4843 7.43392 10.6343C7.28389 10.7843 7.19961 10.9878 7.19961 11.2C7.19961 11.4121 7.28389 11.6156 7.43392 11.7657C7.58395 11.9157 7.78744 12 7.99961 12Z"
                                fill="#3D663D"
                              />
                            </svg>
                          </span>
                        </p>
                        <p className="value">&#x20A6;0.00</p>
                      </div>
                      <div className="card-button-section">
                        <Link
                          to={{
                            pathname: ROUTE_URLS.WITHDRAW,
                            state: { from: location.pathname },
                          }}
                          className="add-money-link"
                        >
                          <button className="btn" disabled={!hasPencom}>
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.24853 3.95156C9.4735 4.1766 9.59988 4.48177 9.59988 4.79996C9.59988 5.11816 9.4735 5.42333 9.24853 5.64836L6.49693 8.39996H13.2001C15.428 8.39996 17.5645 9.28496 19.1398 10.8603C20.7151 12.4356 21.6001 14.5721 21.6001 16.8V19.2C21.6001 19.5182 21.4737 19.8235 21.2487 20.0485C21.0236 20.2735 20.7184 20.4 20.4001 20.4C20.0819 20.4 19.7766 20.2735 19.5516 20.0485C19.3266 19.8235 19.2001 19.5182 19.2001 19.2V16.8C19.2001 15.2087 18.568 13.6825 17.4428 12.5573C16.3176 11.4321 14.7914 10.8 13.2001 10.8H6.49693L9.24853 13.5516C9.36315 13.6623 9.45456 13.7947 9.51745 13.9411C9.58035 14.0875 9.61345 14.2449 9.61483 14.4043C9.61622 14.5636 9.58586 14.7216 9.52552 14.8691C9.46518 15.0166 9.37608 15.1506 9.26341 15.2632C9.15074 15.3759 9.01675 15.465 8.86928 15.5253C8.7218 15.5857 8.56379 15.616 8.40445 15.6147C8.24512 15.6133 8.08765 15.5802 7.94125 15.5173C7.79484 15.4544 7.66243 15.363 7.55173 15.2484L2.75173 10.4484C2.52677 10.2233 2.40039 9.91816 2.40039 9.59996C2.40039 9.28177 2.52677 8.9766 2.75173 8.75156L7.55173 3.95156C7.77677 3.7266 8.08194 3.60022 8.40013 3.60022C8.71833 3.60022 9.0235 3.7266 9.24853 3.95156Z"
                                  fill="#3D663D"
                                />
                              </svg>
                            </span>{' '}
                            Withdraw money
                          </button>
                        </Link>
                      </div>
                    </main>
                  </div>
                </section>
                <TransactionHistoryTable />
              </>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Micro;
