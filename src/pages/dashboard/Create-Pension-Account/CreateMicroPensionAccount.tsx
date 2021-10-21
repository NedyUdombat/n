import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_URLS } from '../../../routes/RouteUrls';

/** Component(s) */
import InnerPageNavBar from '../../../components/navbar/InnerPageNavBar';

const CreateMicroPensionAccount = ({ location: { pathname } }: { location: { pathname: string } }): JSX.Element => {
  return (
    <section className="create-pension-account">
      <InnerPageNavBar pageLogoComponent={true} goBackrouteName="/" />
      <div className="content">
        <h1 className="title">Open a Micro Pension Account</h1>
        <p className="subtitle">Ensure you have the required documents for registration. This may take a while.</p>
        <ul className="list-items">
          <li className="list-item">
            <i className="fa-li fa fa-check-circle" />
            <div className="details">
              <p className="list-title">One Passport Photograph</p>
              <p className="info">
                One (1) recent coloured passport photograph taken against a white background. Face and ears must be
                completely visible.
              </p>
            </div>
          </li>
          <li className="list-item">
            <i className="fa-li fa fa-check-circle" />
            <div className="details">
              <p className="list-title">National Identity Number (NIN)</p>
              <p className="info">
                A valid National Identity Number. You may also be asked to upload a scanned version of your NIN card.
              </p>
            </div>
          </li>
          <li className="list-item">
            <i className="fa-li fa fa-check-circle" />
            <div className="details">
              <p className="list-title">Valid Means of Identfication.</p>
              <p className="info">This can be any of the following:</p>
              <ul className="inner-list">
                <li className="inner-list-item">National Identity Card or Enrolment Slip</li>
                <li className="inner-list-item">Bio data page of current international passport</li>
                <li className="inner-list-item">Official/Company Identification card</li>
                <li className="inner-list-item">Driver’s License</li>
                <li className="inner-list-item">Permanent Voter’s card</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <footer className="create-pension-account-footer">
        <Link
          to={{
            pathname: ROUTE_URLS.SELECT_PENSION_PROVIDER,
            state: { from: pathname },
          }}
          className="next-btn"
        >
          Next
        </Link>
      </footer>
    </section>
  );
};

export default CreateMicroPensionAccount;
