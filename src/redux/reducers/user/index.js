import { createAction, handleActions } from 'redux-actions';

export const types = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  CHECK_DISTANCE: 'CHECK_DISTANCE',
  CONFIRM_CHECK: 'CONFIRM_CHECK',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CREATE_USER_ADMIN: 'CREATE_USER_ADMIN',
};

export const actions = {
  userLogin: createAction(types.USER_LOGIN),
  userLogout: createAction(types.USER_LOGOUT),
  refreshToken: createAction(types.REFRESH_TOKEN),
  checkDistance: createAction(types.CHECK_DISTANCE),
  confirmCheck: createAction(types.CONFIRM_CHECK),
  forgotPassword: createAction(types.FORGOT_PASSWORD),
  changePassword: createAction(types.CHANGE_PASSWORD),
  createUserAdmin: createAction(types.CREATE_USER_ADMIN),
};

export const selectors = {
  selectToken: (state) => state.user.token,
}

const defaultState = {
  user: null,
  token :null
};

export default handleActions(
  {
    [types.REFRESH_TOKEN]: (state, { payload }) => {
      return { ...state, token: payload };
    },
  },
  defaultState,
);