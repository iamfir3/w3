import actionTypes from "../actions/actionTypes";

const initState = {
  keyword: null,
};

const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_KEYWORD:
      return {...state,keyword: action.data,};

    default:
      return state;
  }
};
export default searchReducer;
