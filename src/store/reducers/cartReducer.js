import { fetchCartQuantity } from "../actions";
import actionTypes from "../actions/actionTypes";

const initState = {
  productsCart: [],
  count: 0,
  TotalPrice: 0,
  fetchCartQuantity:false,
  animateStatus: false,
  placeOrder: null,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const products = [];
      for (const product of action?.data) {
        products.push({ ...product, quanity: 1 });
      }
      return {
        ...state,
        productsCart: products,
      };
    case actionTypes.FETCH_CART_QUANTITY:
        return {
          ...state,fetchCartQuantity:action.status
        }
    case actionTypes.DELETE_ALL_CART:
        return {
          ...state,productsCart:[]
        }
    case actionTypes.PLACE_ORDER_CART:
        return {
          placeOrder: [...action.data] || null
        }
    default:
      return state;
  }
};

export default cartReducer;
