import { toast } from 'react-toastify';

/** API Request(s) */
import {
  registrationEndpoint,
  authenticationEndpoint,
  forgotPasswordEndpoint,
  resetPasswordEndpoint,
} from '../../api/auth';
import { setToken } from '../../api/helpers';

/** Types */
import { User } from '../../@types/user.type';
import { Dispatch } from '../../@types/store.type';
import { Unknown } from '../../@types/util.type';
import { http } from '../../api/client';

/** Util(s) */
import { ROUTE_URLS } from '../../routes/RouteUrls';

const REGISTRATION_PROCESS = 'REGISTRATION_PROCESS';
const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

const AUTHENTICATION_PROCESS = 'AUTHENTICATION_PROCESS';
const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

const FORGOT_PASSWORD_PROCESS = 'FORGOT_PASSWORD_PROCESS';
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

const RESET_PASSWORD_PROCESS = 'RESET_PASSWORD_PROCESS';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const register =
  (userData: User, history: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: REGISTRATION_PROCESS });
      const {
        data: { data },
      } = await registrationEndpoint(userData);
      dispatch({ type: REGISTRATION_SUCCESS, payload: data });
      toast.success('Account successfully created');
      history.push(ROUTE_URLS.VERIFICATION_URL);
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
      dispatch({ type: REGISTRATION_ERROR, payload: error.response.data });
    }
  };

export const authenticate =
  (userData: User, history: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: AUTHENTICATION_PROCESS });
      const {
        data: { data },
      } = await authenticationEndpoint(userData);
      setToken(data.token);
      http.defaults.headers['x-auth-token'] = data.token;
      dispatch({ type: AUTHENTICATION_SUCCESS, payload: data });
      toast.success('Welcome Back!');
      history.push(
        data.bvnVerified ? ROUTE_URLS.DASHBOARD_URL : ROUTE_URLS.DASHBOARD_URL,
      );
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
      dispatch({ type: AUTHENTICATION_ERROR, payload: error.response.data });
    }
  };

export const forgotPassword =
  (userData: Unknown) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_PROCESS });
      await forgotPasswordEndpoint(userData);
      dispatch({ type: FORGOT_PASSWORD_SUCCESS });
    } catch (error: any) {
      dispatch({ type: FORGOT_PASSWORD_ERROR, payload: error.response.data });
    }
  };

export const resetPassword =
  (userData: Unknown) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_PROCESS });
      const {
        data: { data },
      } = await resetPasswordEndpoint(userData);
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error: any) {
      toast.error(
        `${
          error.response.data.data
            ? error.response.data.data.message
            : error.response.data.message
        }`,
      );
      dispatch({ type: RESET_PASSWORD_ERROR, payload: error.response.data });
    }
  };

const DEFAULT_STATE = {
  user: {},
  isLoading: false,
  error: {},
};

export const authReducer = (
  state = DEFAULT_STATE,
  action?: { payload: unknown; type: string },
) => {
  switch (action?.type) {
    case REGISTRATION_PROCESS:
    case AUTHENTICATION_PROCESS:
    case FORGOT_PASSWORD_PROCESS:
    case RESET_PASSWORD_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTRATION_SUCCESS:
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case REGISTRATION_ERROR:
    case AUTHENTICATION_ERROR:
    case FORGOT_PASSWORD_ERROR:
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
