import { toast } from 'react-toastify';

/** API Request(s) */
import { createWalletEndpoint } from '../../api/wallet';

/** Type(s) */
import { Dispatch } from '../../@types/store.type';
import { Unknown } from '../../@types/util.type';

import config from '../../config';

const CREATE_WALLET_PROCESS = 'CREATE_WALLET_PROCESS';
const CREATE_WALLET_SUCCESS = 'CREATE_WALLET_SUCCESS';
const CREATE_WALLET_ERROR = 'CREATE_WALLET_ERROR';

export const createWallet =
  (walletData: Unknown, callBack: () => void, finalCallBack: () => void) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATE_WALLET_PROCESS });
      const requestData =
        config.ENVIRONMENT !== 'production'
          ? {
              dateOfBirth: config.DOB,
              pin: config.WALLET_PIN,
              bvn: config.WALLET_BVN,
            }
          : walletData;

      await createWalletEndpoint(requestData);
      dispatch({ type: CREATE_WALLET_SUCCESS });
      callBack();
    } catch (error: any) {
      toast.error(
        `An error occured, please check your credentials and try again`,
      );
      dispatch({ type: CREATE_WALLET_ERROR, payload: error.response.data });
    } finally {
      finalCallBack();
    }
  };

const DEFAULT_STATE = {
  isLoading: false,
  error: {},
};

export const walletReducer = (
  state = DEFAULT_STATE,
  action?: { payload: unknown; type: string },
) => {
  switch (action?.type) {
    case CREATE_WALLET_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_WALLET_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_WALLET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
