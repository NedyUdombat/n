import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Component(s) */
import DashboardLayout from '../../../layouts/DashboardLayout';
import Profile from '../../../components/settings/Profile';
import Security from '../../../components/settings/Security';
import Saved from '../../../components/settings/Saved';

const Settings = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<string>('');

  const location = useLocation();

  const renderActiveCategory = (category: string): JSX.Element | void => {
    switch (category) {
      case 'profile':
        return <Profile />;
      case 'security':
        return <Security />;
      case 'saved':
        return <Saved />;
      default:
        break;
    }
  };

  return (
    <DashboardLayout routeName={location.pathname}>
      <div className="module settings">
        <h1 className="module-title">Settings</h1>
        {!activeCategory && (
          <ul className="list-group list-group-flush settings-list">
            <li
              className="list-group-item d-flex justify-content-between"
              role="menuitem"
              onClick={() => setActiveCategory('profile')}
              onKeyDown={() => setActiveCategory('profile')}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold title">Profile</div>
              </div>
              <span className="badge bg-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="#929292"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </li>
            <li
              className="list-group-item d-flex justify-content-between"
              role="menuitem"
              onClick={() => setActiveCategory('security')}
              onKeyDown={() => setActiveCategory('profile')}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold title">Security</div>
              </div>
              <span className="badge bg-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="#929292"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </li>
            <li
              className="list-group-item d-flex justify-content-between"
              role="menuitem"
              onClick={() => setActiveCategory('saved')}
              onKeyDown={() => setActiveCategory('profile')}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold title">Saved banks & cards</div>
              </div>
              <span className="badge bg-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="#929292"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </li>
          </ul>
        )}
        {activeCategory && (
          <section className="breadcrumbs">
            <button type="button" className="btn home-btn" onClick={() => setActiveCategory('')}>
              Settings
            </button>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 3.33398L10.6667 8.00065L6 12.6673"
                stroke="#333333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="category-name">{activeCategory === 'saved' ? 'Saved banks & cards' : activeCategory}</p>
          </section>
        )}
        {renderActiveCategory(activeCategory)}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
