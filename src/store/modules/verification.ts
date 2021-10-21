import { toast } from 'react-toastify';

/** API Request(s) */
import {
  requestVerificationCodeEndpoint,
  verificationEndpoint,
} from '../../api/verification';

/** Types */
import { Code } from '../../@types/token.type';
import { Dispatch } from '../../@types/store.type';

const VERIFICATION_PROCESS = 'VERIFICATION_PROCESS';
const VERIFICATION_SUCCESS = 'VERIFICATION_SUCCESS';
const VERIFICATION_ERROR = 'VERIFICATION_ERROR';

const REQUEST_VERIFICATION_CODE_PROCESS = 'REQUEST_VERIFICATION_CODE_PROCESS';
const REQUEST_VERIFICATION_CODE_SUCCESS = 'REQUEST_VERIFICATION_CODE_SUCCESS';
const REQUEST_VERIFICATION_CODE_ERROR = 'REQUEST_VERIFICATION_CODE_ERROR';

export const verify =
  (codeData: Code, successCallBack: () => void, finallyCallBack: () => void) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: VERIFICATION_PROCESS });
      await verificationEndpoint(codeData);
      dispatch({ type: VERIFICATION_SUCCESS });
      toast.success('Phone number successfully verified. Please Log in!');
      successCallBack();
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
      dispatch({ type: VERIFICATION_ERROR, payload: error.response.data });
    } finally {
      finallyCallBack();
    }
  };

export const resendCode =
  (
    inputData: { email: string },
    successCallBack: () => void,
    finallyCallBack: () => void,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: REQUEST_VERIFICATION_CODE_PROCESS });
      await requestVerificationCodeEndpoint(inputData);
      dispatch({ type: REQUEST_VERIFICATION_CODE_SUCCESS });
      toast.success(
        'Verificaiton Code has been re-sent to you phone number, please try again!',
      );
      successCallBack();
    } catch (error: any) {
      toast.error(`${error.response.data.message}`);
      dispatch({
        type: REQUEST_VERIFICATION_CODE_ERROR,
        payload: error.response.data,
      });
    } finally {
      finallyCallBack();
    }
  };

const DEFAULT_STATE = {
  isLoading: false,
  error: {},
};

export const verificationReducer = (
  state = DEFAULT_STATE,
  action?: { payload: unknown; type: string },
) => {
  switch (action?.type) {
    case VERIFICATION_PROCESS:
    case REQUEST_VERIFICATION_CODE_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case VERIFICATION_SUCCESS:
    case REQUEST_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case VERIFICATION_ERROR:
    case REQUEST_VERIFICATION_CODE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
