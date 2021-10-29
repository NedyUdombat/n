/** API Request(s) */
import { getUserEndpoint, updateUserEndpoint } from '../../api/user';

/** Type(s) */
import { Dispatch } from '../../@types/store.type';
import { User } from '../../@types/user.type';

const GET_USER_PROCESS = 'GET_USER_PROCESS';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_ERROR = 'GET_USER_ERROR';

const UPDATE_USER_PROCESS = 'UPDATE_USER_PROCESS';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const getUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_USER_PROCESS });
    const {
      data: { data },
    } = await getUserEndpoint();
    dispatch({ type: GET_USER_SUCCESS, payload: data.user });
  } catch (error: any) {
    dispatch({ type: GET_USER_ERROR, payload: error.response.data });
  }
};

export const updateUser =
  (userData: User, history: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_PROCESS });
      const {
        data: { data },
      } = await updateUserEndpoint(userData);
      history.go(0);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    } catch (error: any) {
      dispatch({ type: UPDATE_USER_ERROR, payload: error.response.data });
    }
  };

const DEFAULT_STATE = {
  user: {},
  isLoading: false,
  error: {},
};

export const userReducer = (
  state = DEFAULT_STATE,
  action?: { payload: unknown; type: string },
) => {
  switch (action?.type) {
    case GET_USER_PROCESS:
    case UPDATE_USER_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case GET_USER_ERROR:
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
