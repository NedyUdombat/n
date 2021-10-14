/** API Request(s) */
import { bvnVerificationEndpoint } from '../../api/bvn';

/** Type(s) */
import { Dispatch } from '../../@types/store.type';
import { Unknown } from '../../@types/util.type';

/** Config(s) */
import config from '../../config';

const BVN_VERIFICAITON_PROCESS = 'BVN_VERIFICAITON_PROCESS';
const BVN_VERIFICAITON_SUCCESS = 'BVN_VERIFICAITON_SUCCESS';
const BVN_VERIFICAITON_ERROR = 'BVN_VERIFICAITON_ERROR';

export const verifyBvn =
  (bvnData: Unknown, callBack: () => void, finalCallBack: () => void) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: BVN_VERIFICAITON_PROCESS });
      const {
        data: { data },
      } = await bvnVerificationEndpoint(bvnData);
      dispatch({ type: BVN_VERIFICAITON_SUCCESS, payload: data.bvnVerified });
      callBack();
    } catch (error: any) {
      dispatch({ type: BVN_VERIFICAITON_ERROR, payload: error.response.data });
    } finally {
      finalCallBack();
    }
  };

const DEFAULT_STATE = {
  isLoading: false,
  error: {},
  bvnVerified: false,
};

export const bvnReducer = (
  state = DEFAULT_STATE,
  action?: { payload: unknown; type: string },
) => {
  switch (action?.type) {
    case BVN_VERIFICAITON_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case BVN_VERIFICAITON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bvnVerified: action.payload,
      };
    case BVN_VERIFICAITON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
