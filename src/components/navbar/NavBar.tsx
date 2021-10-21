import React from 'react';

/** Image(s) */
import AwabahLogo from '../../assets/images/brand/awabah_logo.png';

/** Type(s) */
import { User } from '../../@types/user.type';

/** Action(s) */
import { logout } from '../../api/helpers';

interface NavBarPropsTypes {
  user?: User;
}

const NavBar = ({ user }: NavBarPropsTypes): JSX.Element => {
  const capitalize = (name: string | undefined) =>
    name
      ?.split(' ')
      .map((value) => name.replace(value[0], value[0].toUpperCase()))
      .join(' ');

  const initials = (name: string | undefined) =>
    name
      ?.split(' ')
      .map((value) => value[0])
      .join('');

  return (
    <div className="topbar">
      <div className="topbar-header">
        <img src={AwabahLogo} alt="Awabah Logo" className="logo" />
      </div>
      {user && (
        <div className="dropdown">
          <button
            className="btn btn-transparent dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="topbar-profile">
              <p className="username">{user && capitalize(user?.name)}</p>
              <div className="avatar">
                <p className="initials">{user && initials(user?.name)}</p>
              </div>
            </div>
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button" onClick={() => logout()}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
