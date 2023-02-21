import actionTypes from "./actionTypes";
import ApiCart from "../../apis/cart";

export const addToCart = () => async (dispatch) => {
  try {
    const response = await ApiCart.get();
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        data: response.yourCart,
      });
    } else {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      data: null,
    });
  }
};

export const fetchCartQuantity =(status)=>{
  return {
    type:actionTypes.FETCH_CART_QUANTITY,
    status:status,
  }
};

export const deleteAllCart=()=>{
  return {
    type:actionTypes.DELETE_ALL_CART,
  }
}

export const placeOrderData = (data) => {
  return {
    type:actionTypes.PLACE_ORDER_CART,
    data: data,
  }
}
