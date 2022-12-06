import { USER_ACTIONS } from "../actions/user"

const initialState = {
  userName: null,
  token: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN: {
      return {
        ...state,
        userName: action.payload.name,
        token: action.payload.token,
      };
    }
    case USER_ACTIONS.LOGOUT: {
      return {
        ...state,
        userName: null,
        token: null,
      };
    }
    default:
      return state;
  }
};
