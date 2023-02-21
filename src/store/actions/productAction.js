import actionTypes from "./actionTypes";
import ApiProduct from "../../apis/product";
import { Loading } from "./appAction";
export const getProducts = (params) => async (dispatch) => {
  try {
    dispatch(Loading(true));
    const response = await ApiProduct.getAll(params);
    if (response?.status === 0) {
      dispatch(Loading(false));
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        products: response.productData.rows,
        count: response.productData.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        products: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS,
      products: null,
    });
  }
};
export const getLastestProducts = (params) => async (dispatch) => {
  try {
    const response = await ApiProduct.getAll(params);
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.GET_LASTEST_PRODUCTS,
        products: response.productData.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_LASTEST_PRODUCTS,
        products: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_LASTEST_PRODUCTS,
      products: null,
    });
  }
};
export const getTopProducts = (params) => async (dispatch) => {
  try {
    const response = await ApiProduct.getAll(params);
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.GET_TOP_PRODUCTS,
        products: response.productData.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_TOP_PRODUCTS,
        products: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_TOP_PRODUCTS,
      products: null,
    });
  }
};
export const getFavoriteProducts = (params) => async (dispatch) => {
  try {
    const response = await ApiProduct.getAll(params);
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.GET_FAVORITE_PRODUCTS,
        products: response.productData.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_FAVORITE_PRODUCTS,
        products: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_FAVORITE_PRODUCTS,
      products: null,
    });
  }
};
