import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Components */
import SideBar from '../components/side-bar/SideBar';
import NavBar from '../components/navbar/NavBar';

/** Type(s) */
import { RootState } from '../store/rootReducer';

/** Action(s) */
import { getUser } from '../store/modules/user';

interface DashboardLayoutPropsTypes {
  children: React.ReactNode;
  routeName?: string;
}

const DashboardLayout = ({ children, routeName }: DashboardLayoutPropsTypes): JSX.Element => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <section className="dashboard-layout">
      {user && (
        <>
          <NavBar user={user} />
          {/* <SideBar routeName={routeName} /> */}
          <main className="main">
            <div className="child-section">{children}</div>
          </main>
        </>
      )}
    </section>
  );
};

export default DashboardLayout;
