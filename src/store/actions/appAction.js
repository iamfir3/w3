import actionTypes from "./actionTypes";
import ApiCategory from "../../apis/category";
import ApiProduct from "../../apis/product";

export const getCategory = () => async (dispatch) => {
  try {
    const response = await ApiCategory.getAllByUser();
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.GET_CATEGORY,
        data: response.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CATEGORY,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORY,
      data: null,
    });
  }
};

export const getProductBestSeller = (params) => async (dispatch) => {
  try {
    const response = await ApiProduct.getAll(params);
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCT_BEST_SELLER,
        data: response.productData.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCT_BEST_SELLER,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_BEST_SELLER,
      data: null,
    });
  }
};

export const getProductCurrentUpdate = (params) => async (dispatch) => {
  try {
    const response = await ApiProduct.getAll(params);
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCT_CURRENT_UPDATE,
        data: response.productData.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCT_CURRENT_UPDATE,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_CURRENT_UPDATE,
      data: null,
    });
  }
};

export const getProductByIdClient = (params) => async (dispatch) => {
  try {
    const response = await ApiProduct.getProductByIdClient(params);
    if (response?.status === 0) {
      dispatch({
        type: actionTypes.GET_PRODUCT_BY_ID,
        data: response.productData.rows[0],
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCT_BY_ID,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_BY_ID,
      data: null,
    });
  }
};

export const getCodeCategory = (code) => {
  return {
    type: actionTypes.GET_CODE_CATEGORIES,
    data: code,
  };
};
export const Loading = (status) => {
  return {
    type: "Loading",
    data: status,
  };
};
export const detailOrder = (order) => ({
  type: actionTypes.DETAIL_ORDER,
  order,
});
