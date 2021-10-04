import React from 'react';

/** Components */
import NavBar from '../components/navbar/NavBar';

interface AuthLayoutPropsTypes {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutPropsTypes): JSX.Element => (
  <section className="auth-layout">
    <NavBar />
    <main className="main">{children}</main>
  </section>
);

export default AuthLayout;
