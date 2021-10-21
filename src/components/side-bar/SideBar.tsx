import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** Image(s) */
import AwabahLogo from '../../assets/images/brand/awabah_logo.png';

/** Util(s) */
import { menuArray } from './SidebarConstants';

interface SibeBarPropsTypes {
  routeName?: string;
}

const SideBar = ({ routeName }: SibeBarPropsTypes): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState<string | undefined>('');

  useEffect(() => {
    setActiveMenu(routeName);
  }, [routeName]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header text-center py-3">
        <img src={AwabahLogo} alt="Awabah Logo" className="logo" />
      </div>
      <div className="sidebar-menu">
        {menuArray.map((menu) => (
          <li key={menu.name} className={activeMenu === menu.path ? 'active menu-list-item' : 'menu-list-item'}>
            <Link to={menu.path} onClick={() => setActiveMenu(menu.path)} className="menu-list-item-link">
              <img
                src={activeMenu === menu.path ? menu.iconActive : menu.icon}
                alt="Page Icon"
                className="menu-list-item-icon"
              />
              <p className="menu-list-item-title">{menu.name}</p>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
