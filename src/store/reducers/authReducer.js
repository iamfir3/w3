import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false,
  accessToken: null,
  msg: null,
  userCurrent: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.token,
        msg: action.message,
        userCurrent: action?.userCurrent,
      };
    case actionTypes.LOGIN_FAIL:
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
        msg: action.message,
        userCurrent: {},
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
        msg: null,
        userCurrent: {},
      };
    case actionTypes.GET_CURRENT:
      return {
        ...state,
        userCurrent: action.data,
      };
    default:
      return state;
  }
};

export default authReducer;
