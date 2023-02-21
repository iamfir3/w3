import actionTypes from "./actionTypes";
import wishlist from "../../apis/wishlist";

export const fetchWishlist = (payload) => async (dispatch) => {
  try {
    const response = await wishlist.getAllWish();
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.GET_ALL_WISHLIST,
        data: response.wishlist,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_WISHLIST,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_WISHLIST,
      data: null,
    });
  }
};
