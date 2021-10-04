/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/** Utils(s) */
import { getToken } from '../api/helpers';
import { ROUTE_URLS } from './RouteUrls';

export const GuestRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      !getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: ROUTE_URLS.DASHBOARD_URL,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
