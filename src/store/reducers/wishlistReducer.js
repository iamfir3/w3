import actionTypes from "../actions/actionTypes";

const initState = {
  wishlist:[],
};

const wishlistReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_WISHLIST:
      return {...state,wishlist:action.data};

    default:
      return state;
  }
};
export default wishlistReducer;
