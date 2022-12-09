const USER_BASE = 'user';

export const USER_ACTIONS = {
  LOGIN: `${USER_BASE}/login`,
  LOGOUT: `${USER_BASE}/logout`,
};

export const userLogin = user => ({
  type: USER_ACTIONS.LOGIN,
  payload: user,
});

export const userLogout = () => ({type: USER_ACTIONS.LOGOUT});
