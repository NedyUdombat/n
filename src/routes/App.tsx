import React from 'react';
import { Switch, Route } from 'react-router-dom';

/** Util(s) */
import { ROUTE_URLS } from './RouteUrls';
import { GuestRoute } from './GuestRoute';
import { PrivateRoute } from './PrivateRoute';

/* Dashboard Page(s) */
import Home from '../pages/dashboard/Home/Home';
import Micro from '../pages/dashboard/Micro/Micro';
import WithdrawMoney from '../pages/dashboard/Micro/WithdrawMoney';
import AddMoney from '../pages/dashboard/Micro/AddMoney';
import Settings from '../pages/dashboard/Settings/Settings';
import Wallet from '../pages/dashboard/Wallet/Wallet';
import TransferMoney from '../pages/dashboard/Wallet/TransferMoney';
import CreateMicroPensionAccount from '../pages/dashboard/Create-Pension-Account/CreateMicroPensionAccount';
import SelectPensionProvider from '../pages/dashboard/Create-Pension-Account/SelectPensionProvider';
import PensionForm from '../pages/dashboard/Create-Pension-Account/PensionForm';

/* Post Auth Page(s) */
import KYC from '../pages/kyc/bvn';
import CreateWallet from '../pages/wallets/create-wallet/Create-Wallet';

/** Authentication Page(s) */
import Registration from '../pages/auth/registration/Registration';
import Authentication from '../pages/auth/authentication/Authentication';
import ForgotPassword from '../pages/auth/forgot-password/ForgotPassword';
import Verification from '../pages/auth/verification/Verification';
import ResetPassword from '../pages/auth/reset-password/ResetPassword';
import ResendToken from '../pages/auth/resend-token/ResendToken';

/** Other Page(s) */
import NotFound from '../pages/errors/NotFound';

const App = () => {
  return (
    <Switch>
      {/* Authentication Page(s)*/}
      <GuestRoute
        exact
        path={ROUTE_URLS.REGISTRATION_URL}
        component={Registration}
      />
      <GuestRoute
        exact
        path={ROUTE_URLS.AUTHENTICATION_URL}
        component={Authentication}
      />
      <GuestRoute
        exact
        path={ROUTE_URLS.FORGOT_PASSWORD_URL}
        component={ForgotPassword}
      />
      <GuestRoute
        exact
        path={ROUTE_URLS.RESET_PASSWORD_URL}
        component={ResetPassword}
      />
      <GuestRoute
        exact
        path={ROUTE_URLS.VERIFICATION_URL}
        component={Verification}
      />
      <GuestRoute
        exact
        path={ROUTE_URLS.RESEND_TOKEN_URL}
        component={ResendToken}
      />
      {/* Post Auth Pag(s) */}
      <PrivateRoute exact path={ROUTE_URLS.KYC} component={KYC} />
      <PrivateRoute
        exact
        path={ROUTE_URLS.CREATE_WALLET}
        component={CreateWallet}
      />
      {/* Dashboard Page(s) */}
      <PrivateRoute exact path={ROUTE_URLS.HOME_PAGE} component={Home} />
      <PrivateRoute exact path={ROUTE_URLS.DASHBOARD_URL} component={Home} />
      <PrivateRoute exact path={ROUTE_URLS.MICRO_PENSION} component={Micro} />
      <PrivateRoute
        exact
        path={ROUTE_URLS.WITHDRAW}
        component={WithdrawMoney}
      />
      <PrivateRoute exact path={ROUTE_URLS.ADD_MONEY} component={AddMoney} />
      <PrivateRoute exact path={ROUTE_URLS.SETTINGS} component={Settings} />
      <PrivateRoute exact path={ROUTE_URLS.WALLET} component={Wallet} />
      <PrivateRoute
        exact
        path={ROUTE_URLS.TRANSFER_MONEY}
        component={TransferMoney}
      />
      <PrivateRoute
        exact
        path={ROUTE_URLS.CREATE_PENCOM_ACCOUNT}
        component={CreateMicroPensionAccount}
      />
      <PrivateRoute
        exact
        path={ROUTE_URLS.SELECT_PENSION_PROVIDER}
        component={SelectPensionProvider}
      />
      <PrivateRoute
        exact
        path={ROUTE_URLS.CREATE_PENSION_FORM}
        component={PensionForm}
      />
      {/** Other Page(s) */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default App;
