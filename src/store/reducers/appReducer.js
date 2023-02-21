import actionTypes from "../actions/actionTypes";

const initState = {
  categories: [],
  code: "",
  pageLength: "",
  productsBestSeller: [],
  productsCurrentUpdate: [],
  currentProduct: null,
  loading: false,
  detailOrder: null,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        loading: action.data,
      };
    case actionTypes.GET_PRODUCT_BEST_SELLER:
      return {
        ...state,
        productsBestSeller: action.data,
      };
    case actionTypes.GET_CATEGORY:
      return {
        ...state,
        categories: action.data,
      };
    case actionTypes.GET_PRODUCT_BY_ID:
      return {
        ...state,
        currentProduct: action.data,
      };
    case actionTypes.GET_PRODUCT_CURRENT_UPDATE:
      return {
        ...state,
        productsCurrentUpdate: action.data,
      };
    case actionTypes.GET_CODE_CATEGORIES:
      return {
        ...state,
        code: action.data,
      };
    case actionTypes.DETAIL_ORDER:
      return {
        ...state,
        detailOrder: action.order || null,
      };
    default:
      return state;
  }
};

export default appReducer;
