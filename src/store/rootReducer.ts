import { combineReducers } from 'redux';

/** Reducers(s) */
import { authReducer } from './modules/auth';
import { verificationReducer } from './modules/verification';
import { userReducer } from './modules/user';
import { bvnReducer } from './modules/bvn';
import { walletReducer } from './modules/wallet';
import { pencomReducer } from './modules/pencom';

export const rootReducer = combineReducers({
  auth: authReducer,
  verification: verificationReducer,
  user: userReducer,
  bvn: bvnReducer,
  wallet: walletReducer,
  pencom: pencomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
