import React from 'react';
import { Link } from 'react-router-dom';

/** Icon(s) */
import closeIcon from '../../assets/icons/closeIcon.svg';

/** Image(s) */
import AwabahLogo from '../../assets/images/brand/awabah_logo.png';

interface InnerPageNavBarPropsTypes {
  pageTitle?: string;
  pageLogoComponent?: boolean;
  goBackrouteName: string;
  goBackFunction?: () => void;
}

const InnerPageNavBar = ({
  pageTitle,
  pageLogoComponent,
  goBackrouteName,
  goBackFunction,
}: InnerPageNavBarPropsTypes): JSX.Element => (
  <div className="inner-navbar">
    {pageLogoComponent ? (
      <img src={AwabahLogo} alt="Awabah Logo" className="logo" />
    ) : (
      <div className="page-title">{pageTitle}</div>
    )}
    {goBackrouteName === 'function' ? (
      <button type="button" onClick={goBackFunction} className="btn close-link">
        <span className="close-link-text">Close</span>
        <img src={closeIcon} alt="Close Icon" className="close-link-icon" />
      </button>
    ) : (
      <Link to={goBackrouteName} className="close-link">
        <span className="close-link-text">Close</span>
        <img src={closeIcon} alt="Close Icon" className="close-link-icon" />
      </Link>
    )}
  </div>
);

export default InnerPageNavBar;
